import * as childProcess from 'child_process'
import * as fs from 'fs'
import * as path from 'path'
import {promisify} from 'util'
import * as ioUtil from './io-util'

const IS_WINDOWS = process.platform === 'win32'
const exec = promisify(childProcess.exec)

/**
 * Interface for cp/mv options
 */
export interface CopyOptions {
  /** Optional. Whether to recursively copy all subdirectories. Defaults to false */
  recursive?: boolean
  /** Optional. Whether to overwrite existing files in the destination. Defaults to true */
  force?: boolean
}

/**
 * Copies a file or folder.
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See CopyOptions.
 */
export async function cp(
  source: string,
  dest: string,
  options: CopyOptions = {}
): Promise<void> {
  const {force, recursive} = readCopyOptions(options)

  if (await ioUtil.isDirectory(source)) {
    if (!recursive) {
      throw new Error(`non-recursive cp failed, ${source} is a directory`)
    }

    // If directory exists, copy source inside it. Otherwise, create it and copy contents of source inside.
    if (await ioUtil.exists(dest)) {
      if (!(await ioUtil.isDirectory(dest))) {
        throw new Error(`${dest} is not a directory`)
      }

      dest = path.join(dest, path.basename(source))
    }

    await copyDirectoryContents(source, dest, force)
  } else {
    if (force) {
      await fs.promises.copyFile(source, dest)
    } else {
      await fs.promises.copyFile(source, dest, fs.constants.COPYFILE_EXCL)
    }
  }
}

/**
 * Moves a path.
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See CopyOptions.
 */
export async function mv(
  source: string,
  dest: string,
  options: CopyOptions = {}
): Promise<void> {
  const {force, recursive} = readCopyOptions(options)

  if (await ioUtil.isDirectory(source)) {
    if (!recursive) {
      throw new Error(`non-recursive cp failed, ${source} is a directory`)
    }

    // If directory exists, move source inside it. Otherwise, create it and move contents of source inside.
    if (await ioUtil.exists(dest)) {
      if (!(await ioUtil.isDirectory(dest))) {
        throw new Error(`${dest} is not a directory`)
      }

      dest = path.join(dest, path.basename(source))
    }

    await copyDirectoryContents(source, dest, force, true)
  } else {
    if (force) {
      await fs.promises.copyFile(source, dest)
    } else {
      await fs.promises.copyFile(source, dest, fs.constants.COPYFILE_EXCL)
    }

    // Delete file after copying since this is mv.
    await fs.promises.unlink(source)
  }
}

/**
 * Remove a path recursively with force
 *
 * @param inputPath path to remove
 */
export async function rmRF(inputPath: string): Promise<void> {
  if (IS_WINDOWS) {
    // Node doesn't provide a delete operation, only an unlink function. This means that if the file is being used by another
    // program (e.g. antivirus), it won't be deleted. To address this, we shell out the work to rd/del.
    try {
      if (await ioUtil.isDirectory(inputPath)) {
        await exec(`rd /s /q "${inputPath}"`)
      } else {
        await exec(`del /f /a "${inputPath}"`)
      }
    } catch (err) {
      // if you try to delete a file that doesn't exist, desired result is achieved
      // other errors are valid
      if (err.code !== 'ENOENT') throw err
    }

    // Shelling out fails to remove a symlink folder with missing source, this unlink catches that
    try {
      await fs.promises.unlink(inputPath)
    } catch (err) {
      // if you try to delete a file that doesn't exist, desired result is achieved
      // other errors are valid
      if (err.code !== 'ENOENT') throw err
    }
  } else {
    // get the lstats in order to workaround a bug in shelljs@0.3.0 where symlinks
    // with missing targets are not handled correctly by "rm('-rf', path)"
    let isDir = false
    try {
      isDir = await ioUtil.isDirectory(inputPath)
    } catch (err) {
      // if you try to delete a file that doesn't exist, desired result is achieved
      // other errors are valid
      if (err.code !== 'ENOENT') throw err
      return
    }

    if (isDir) {
      await ioUtil.removeDirectory(inputPath)
    } else {
      await fs.promises.unlink(inputPath)
    }
  }
}

/**
 * Make a directory.  Creates the full path with folders in between
 * Will throw if it fails
 *
 * @param   fsPath        path to create
 * @returns Promise<void>
 */
export async function mkdirP(fsPath: string): Promise<void> {
  if (!fsPath) {
    throw new Error('Parameter p is required')
  }

  // build a stack of directories to create
  const stack: string[] = []
  let testDir: string = fsPath

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // validate the loop is not out of control
    if (stack.length >= (process.env['TEST_MKDIRP_FAILSAFE'] || 1000)) {
      // let the framework throw
      await fs.promises.mkdir(fsPath)
      return
    }

    let stats: fs.Stats
    try {
      stats = await fs.promises.stat(testDir)
    } catch (err) {
      if (err.code === 'ENOENT') {
        // validate the directory is not the drive root
        const parentDir = path.dirname(testDir)
        if (testDir === parentDir) {
          throw new Error(
            `Unable to create directory '${fsPath}'. Root directory does not exist: '${testDir}'`
          )
        }

        // push the dir and test the parent
        stack.push(testDir)
        testDir = parentDir
        continue
      } else if (err.code === 'UNKNOWN') {
        throw new Error(
          `Unable to create directory '${fsPath}'. Unable to verify the directory exists: '${testDir}'. If directory is a file share, please verify the share name is correct, the share is online, and the current process has permission to access the share.`
        )
      } else {
        throw err
      }
    }

    if (!stats.isDirectory()) {
      throw new Error(
        `Unable to create directory '${fsPath}'. Conflicting file exists: '${testDir}'`
      )
    }

    // testDir exists
    break
  }

  // create each directory
  let dir = stack.pop()
  while (dir != null) {
    await fs.promises.mkdir(dir)
    dir = stack.pop()
  }
}

/**
 * Returns path of a tool had the tool actually been invoked.  Resolves via paths.
 * If you check and the tool does not exist, it will throw.
 *
 * @param     tool              name of the tool
 * @param     check             whether to check if tool exists
 * @returns   Promise<string>   path to tool
 */
export async function which(tool: string, check?: boolean): Promise<string> {
  if (!tool) {
    throw new Error("parameter 'tool' is required")
  }

  // recursive when check=true
  if (check) {
    const result: string = await which(tool, false)

    if (!result) {
      if (IS_WINDOWS) {
        throw new Error(
          `Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`
        )
      } else {
        throw new Error(
          `Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`
        )
      }
    }
  }

  try {
    // build the list of extensions to try
    const extensions: string[] = []
    if (IS_WINDOWS && process.env.PATHEXT) {
      for (const extension of process.env.PATHEXT.split(path.delimiter)) {
        if (extension) {
          extensions.push(extension)
        }
      }
    }

    // if it's rooted, return it if exists. otherwise return empty.
    if (ioUtil.isRooted(tool)) {
      const filePath: string = await ioUtil.tryGetExecutablePath(
        tool,
        extensions
      )

      if (filePath) {
        return filePath
      }

      return ''
    }

    // if any path separators, return empty
    if (tool.includes('/') || (IS_WINDOWS && tool.includes('\\'))) {
      return ''
    }

    // build the list of directories
    //
    // Note, technically "where" checks the current directory on Windows. From a task lib perspective,
    // it feels like we should not do this. Checking the current directory seems like more of a use
    // case of a shell, and the which() function exposed by the task lib should strive for consistency
    // across platforms.
    const directories: string[] = []

    if (process.env.PATH) {
      for (const p of process.env.PATH.split(path.delimiter)) {
        if (p) {
          directories.push(p)
        }
      }
    }

    // return the first match
    for (const directory of directories) {
      const filePath = await ioUtil.tryGetExecutablePath(
        directory + path.sep + tool,
        extensions
      )
      if (filePath) {
        return filePath
      }
    }

    return ''
  } catch (err) {
    throw new Error(`which failed with message ${err.message}`)
  }
}

// Copies contents of source into dest, making any necessary folders along the way.
// Deletes the original copy if deleteOriginal is true
async function copyDirectoryContents(
  source: string,
  dest: string,
  force: boolean,
  deleteOriginal = false
): Promise<void> {
  if (await ioUtil.isDirectory(source)) {
    if (await ioUtil.exists(dest)) {
      if (!(await ioUtil.isDirectory(dest))) {
        throw new Error(`${dest} is not a directory`)
      }
    } else {
      await mkdirP(dest)
    }

    // Copy all child files, and directories recursively
    const sourceChildren: string[] = await fs.promises.readdir(source)

    for (const newSource of sourceChildren) {
      const newDest = path.join(dest, path.basename(newSource))
      await copyDirectoryContents(
        path.resolve(source, newSource),
        newDest,
        force,
        deleteOriginal
      )
    }

    if (deleteOriginal) {
      await fs.promises.rmdir(source)
    }
  } else {
    if (force) {
      await fs.promises.copyFile(source, dest)
    } else {
      await fs.promises.copyFile(source, dest, fs.constants.COPYFILE_EXCL)
    }
    if (deleteOriginal) {
      await fs.promises.unlink(source)
    }
  }
}

function readCopyOptions(options: CopyOptions): Required<CopyOptions> {
  const force = options.force == null ? true : options.force
  const recursive = Boolean(options.recursive)
  return {force, recursive}
}
