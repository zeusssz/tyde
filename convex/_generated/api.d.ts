/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as chatbot from "../chatbot.js";
import type * as clerk from "../clerk.js";
import type * as http from "../http.js";
import type * as mutations from "../mutations.js";
import type * as queries from "../queries.js";
import type * as questions from "../questions.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  chatbot: typeof chatbot;
  clerk: typeof clerk;
  http: typeof http;
  mutations: typeof mutations;
  queries: typeof queries;
  questions: typeof questions;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
