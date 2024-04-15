/* tslint:disable */
/* eslint-disable */
/**
 * 
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import { CommonsCommitCacheRequest } from '../models';
// @ts-ignore
import { CommonsCommitCacheResponse } from '../models';
// @ts-ignore
import { CommonsDeleteCacheRequest } from '../models';
// @ts-ignore
import { CommonsDeleteCacheResponse } from '../models';
// @ts-ignore
import { CommonsGetCacheRequest } from '../models';
// @ts-ignore
import { CommonsGetCacheResponse } from '../models';
// @ts-ignore
import { CommonsReserveCacheRequest } from '../models';
// @ts-ignore
import { CommonsReserveCacheResponse } from '../models';
// @ts-ignore
import { WarpBuildAPIError } from '../models';
/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * do ping
         * @summary pings the api
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pingGet: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/ping`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * commit cache
         * @summary commit cache
         * @param {CommonsCommitCacheRequest} body Commit Cache Request Body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        v1CacheCommitPost: async (body: CommonsCommitCacheRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            assertParamExists('v1CacheCommitPost', 'body', body)
            const localVarPath = `/v1/cache/commit`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * delete cache
         * @summary delete cache
         * @param {CommonsDeleteCacheRequest} body Delete Cache Request Body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        v1CacheDeletePost: async (body: CommonsDeleteCacheRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            assertParamExists('v1CacheDeletePost', 'body', body)
            const localVarPath = `/v1/cache/delete`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * get cache
         * @summary get cache
         * @param {CommonsGetCacheRequest} body Get Cache Request Body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        v1CacheGetPost: async (body: CommonsGetCacheRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            assertParamExists('v1CacheGetPost', 'body', body)
            const localVarPath = `/v1/cache/get`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * reserve cache
         * @summary reserve cache
         * @param {CommonsReserveCacheRequest} body Reserve Cache Request Body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        v1CacheReservePost: async (body: CommonsReserveCacheRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            assertParamExists('v1CacheReservePost', 'body', body)
            const localVarPath = `/v1/cache/reserve`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * do ping
         * @summary pings the api
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pingGet(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.pingGet(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.pingGet']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * commit cache
         * @summary commit cache
         * @param {CommonsCommitCacheRequest} body Commit Cache Request Body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async v1CacheCommitPost(body: CommonsCommitCacheRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CommonsCommitCacheResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.v1CacheCommitPost(body, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.v1CacheCommitPost']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * delete cache
         * @summary delete cache
         * @param {CommonsDeleteCacheRequest} body Delete Cache Request Body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async v1CacheDeletePost(body: CommonsDeleteCacheRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CommonsDeleteCacheResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.v1CacheDeletePost(body, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.v1CacheDeletePost']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * get cache
         * @summary get cache
         * @param {CommonsGetCacheRequest} body Get Cache Request Body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async v1CacheGetPost(body: CommonsGetCacheRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CommonsGetCacheResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.v1CacheGetPost(body, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.v1CacheGetPost']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * reserve cache
         * @summary reserve cache
         * @param {CommonsReserveCacheRequest} body Reserve Cache Request Body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async v1CacheReservePost(body: CommonsReserveCacheRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CommonsReserveCacheResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.v1CacheReservePost(body, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.v1CacheReservePost']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * do ping
         * @summary pings the api
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pingGet(options?: RawAxiosRequestConfig): AxiosPromise<string> {
            return localVarFp.pingGet(options).then((request) => request(axios, basePath));
        },
        /**
         * commit cache
         * @summary commit cache
         * @param {DefaultApiV1CacheCommitPostRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        v1CacheCommitPost(requestParameters: DefaultApiV1CacheCommitPostRequest, options?: RawAxiosRequestConfig): AxiosPromise<CommonsCommitCacheResponse> {
            return localVarFp.v1CacheCommitPost(requestParameters.body, options).then((request) => request(axios, basePath));
        },
        /**
         * delete cache
         * @summary delete cache
         * @param {DefaultApiV1CacheDeletePostRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        v1CacheDeletePost(requestParameters: DefaultApiV1CacheDeletePostRequest, options?: RawAxiosRequestConfig): AxiosPromise<CommonsDeleteCacheResponse> {
            return localVarFp.v1CacheDeletePost(requestParameters.body, options).then((request) => request(axios, basePath));
        },
        /**
         * get cache
         * @summary get cache
         * @param {DefaultApiV1CacheGetPostRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        v1CacheGetPost(requestParameters: DefaultApiV1CacheGetPostRequest, options?: RawAxiosRequestConfig): AxiosPromise<CommonsGetCacheResponse> {
            return localVarFp.v1CacheGetPost(requestParameters.body, options).then((request) => request(axios, basePath));
        },
        /**
         * reserve cache
         * @summary reserve cache
         * @param {DefaultApiV1CacheReservePostRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        v1CacheReservePost(requestParameters: DefaultApiV1CacheReservePostRequest, options?: RawAxiosRequestConfig): AxiosPromise<CommonsReserveCacheResponse> {
            return localVarFp.v1CacheReservePost(requestParameters.body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for v1CacheCommitPost operation in DefaultApi.
 * @export
 * @interface DefaultApiV1CacheCommitPostRequest
 */
export interface DefaultApiV1CacheCommitPostRequest {
    /**
     * Commit Cache Request Body
     * @type {CommonsCommitCacheRequest}
     * @memberof DefaultApiV1CacheCommitPost
     */
    readonly body: CommonsCommitCacheRequest
}

/**
 * Request parameters for v1CacheDeletePost operation in DefaultApi.
 * @export
 * @interface DefaultApiV1CacheDeletePostRequest
 */
export interface DefaultApiV1CacheDeletePostRequest {
    /**
     * Delete Cache Request Body
     * @type {CommonsDeleteCacheRequest}
     * @memberof DefaultApiV1CacheDeletePost
     */
    readonly body: CommonsDeleteCacheRequest
}

/**
 * Request parameters for v1CacheGetPost operation in DefaultApi.
 * @export
 * @interface DefaultApiV1CacheGetPostRequest
 */
export interface DefaultApiV1CacheGetPostRequest {
    /**
     * Get Cache Request Body
     * @type {CommonsGetCacheRequest}
     * @memberof DefaultApiV1CacheGetPost
     */
    readonly body: CommonsGetCacheRequest
}

/**
 * Request parameters for v1CacheReservePost operation in DefaultApi.
 * @export
 * @interface DefaultApiV1CacheReservePostRequest
 */
export interface DefaultApiV1CacheReservePostRequest {
    /**
     * Reserve Cache Request Body
     * @type {CommonsReserveCacheRequest}
     * @memberof DefaultApiV1CacheReservePost
     */
    readonly body: CommonsReserveCacheRequest
}

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * do ping
     * @summary pings the api
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public pingGet(options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).pingGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * commit cache
     * @summary commit cache
     * @param {DefaultApiV1CacheCommitPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public v1CacheCommitPost(requestParameters: DefaultApiV1CacheCommitPostRequest, options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).v1CacheCommitPost(requestParameters.body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * delete cache
     * @summary delete cache
     * @param {DefaultApiV1CacheDeletePostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public v1CacheDeletePost(requestParameters: DefaultApiV1CacheDeletePostRequest, options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).v1CacheDeletePost(requestParameters.body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * get cache
     * @summary get cache
     * @param {DefaultApiV1CacheGetPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public v1CacheGetPost(requestParameters: DefaultApiV1CacheGetPostRequest, options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).v1CacheGetPost(requestParameters.body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * reserve cache
     * @summary reserve cache
     * @param {DefaultApiV1CacheReservePostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public v1CacheReservePost(requestParameters: DefaultApiV1CacheReservePostRequest, options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).v1CacheReservePost(requestParameters.body, options).then((request) => request(this.axios, this.basePath));
    }
}

