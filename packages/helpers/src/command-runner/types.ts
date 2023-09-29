import * as exec from '@actions/exec'

/* CommandRunner core */

export interface CommandRunnerContext<S = unknown> {
  /* Inputs with which command was executed */
  commandLine: string
  args: string[]
  options: exec.ExecOptions

  /* Results of the execution */
  execerr: Error | null
  stderr: string | null
  stdout: string | null
  exitCode: number | null

  /* Arbitrary state that can be change during middleware execution if needed */
  state: S | null
}

/* Middlewares as used internally in CommandRunner */
export type CommandRunnerMiddlewarePromisified = (
  ctx: CommandRunnerContext,
  next: () => Promise<void>
) => Promise<void>

/* Middlewares as used by the user */
export type CommandRunnerMiddleware<S = unknown> = (
  ctx: CommandRunnerContext<S>,
  next: () => Promise<void>
) => void | Promise<void>

/* Command runner events handling and command runner actions */

/* Command runner default actions types on which preset middleware exists */
export type CommandRunnerActionType = 'throw' | 'fail' | 'log'

/* Command runner event types as used internally passed to middleware for the user */
export type CommandRunnerEventType = 'execerr' | 'stderr' | 'no-stdout' | 'ok'

/* Command runner event types as used by the user for filtering results */
export type CommandRunnerEventTypeExtended =
  | CommandRunnerEventType
  | `!${CommandRunnerEventType}`
