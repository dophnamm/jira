declare module "urlcat" {
  import { IStringifyOptions } from "qs";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type ParamMap = Record<string, any>;
  type UrlCatConfiguration = Partial<
    Pick<IStringifyOptions, "arrayFormat"> & {
      objectFormat: Partial<Pick<IStringifyOptions, "format">>;
    }
  >;
  /**
   * Builds a URL using the base template and specified parameters.
   *
   * @param {String} baseTemplate a URL template that contains zero or more :params
   * @param {Object} params an object with properties that correspond to the :params
   *   in the base template. Unused properties become query params.
   *
   * @returns {String} a URL with path params substituted and query params appended
   *
   * @example
   * ```ts
   * urlcat('http://api.example.com/users/:id', { id: 42, search: 'foo' })
   * // -> 'http://api.example.com/users/42?search=foo
   * ```
   */
  declare function urlcat(baseTemplate: string, params: ParamMap): string;
  /**
   * Concatenates the base URL and the path specified using '/' as a separator.
   * If a '/' occurs at the concatenation boundary in either parameter, it is removed.
   *
   * @param {String} baseUrl the first part of the URL
   * @param {String} path the second part of the URL
   *
   * @returns {String} the result of the concatenation
   *
   * @example
   * ```ts
   * urlcat('http://api.example.com/', '/users')
   * // -> 'http://api.example.com/users
   * ```
   */
  declare function urlcat(baseUrl: string, path: string): string;
  /**
   * Concatenates the base URL and the path specified using '/' as a separator.
   * If a '/' occurs at the concatenation boundary in either parameter, it is removed.
   * Substitutes path parameters with the properties of the @see params object and appends
   * unused properties in the path as query params.
   *
   * @param {String} baseUrl the first part of the URL
   * @param {String} path the second part of the URL
   * @param {Object} params Object with properties that correspond to the :params
   *   in the base template. Unused properties become query params.
   *
   * @returns {String} URL with path params substituted and query params appended
   *
   * @example
   * ```ts
   * urlcat('http://api.example.com/', '/users/:id', { id: 42, search: 'foo' })
   * // -> 'http://api.example.com/users/42?search=foo
   * ```
   */
  declare function urlcat(
    baseUrl: string,
    pathTemplate: string,
    params: ParamMap
  ): string;
  /**
   * Concatenates the base URL and the path specified using '/' as a separator.
   * If a '/' occurs at the concatenation boundary in either parameter, it is removed.
   * Substitutes path parameters with the properties of the @see params object and appends
   * unused properties in the path as query params.
   *
   * @param {String} baseUrl the first part of the URL
   * @param {String} path the second part of the URL
   * @param {Object} params Object with properties that correspond to the :params
   *   in the base template. Unused properties become query params.
   * @param {Object} config urlcat configuration object
   *
   * @returns {String} URL with path params substituted and query params appended
   *
   * @example
   * ```ts
   * urlcat('http://api.example.com/', '/users/:id', { id: 42, search: 'foo' }, {objectFormat: {format: 'RFC1738'}})
   * // -> 'http://api.example.com/users/42?search=foo
   * ```
   */
  declare function urlcat(
    baseUrlOrTemplate: string,
    pathTemplateOrParams: string | ParamMap,
    maybeParams: ParamMap,
    config: UrlCatConfiguration
  ): string;
  /**
   * Factory function providing a pre configured urlcat function
   *
   * @param {Object} config Configuration object for urlcat
   *
   * @returns {Function} urlcat decorator function
   *
   * @example
   * ```ts
   * configure({arrayFormat: 'brackets', objectFormat: {format: 'RFC1738'}})
   * ```
   */
  declare function configure(
    rootConfig: UrlCatConfiguration
  ): (
    baseUrlOrTemplate: string,
    pathTemplateOrParams: string | ParamMap,
    maybeParams?: ParamMap,
    config?: UrlCatConfiguration
  ) => string;
  /**
   * Creates a query string from the specified object.
   *
   * @param {Object} params an object to convert into a query string.
   * @param {Object} config configuration to stringify the query params.
   *
   * @returns {String} Query string.
   *
   * @example
   * ```ts
   * query({ id: 42, search: 'foo' })
   * // -> 'id=42&search=foo'
   * ```
   */
  declare function query(
    params: ParamMap,
    config?: UrlCatConfiguration
  ): string;
  /**
   * Substitutes :params in a template with property values of an object.
   *
   * @param {String} template a string that contains :params.
   * @param {Object} params an object with keys that correspond to the params in the template.
   *
   * @returns {String} Rendered path after substitution.
   *
   * @example
   * ```ts
   * subst('/users/:id/posts/:postId', { id: 42, postId: 36 })
   * // -> '/users/42/posts/36'
   * ```
   */
  declare function subst(template: string, params: ParamMap): string;
  /**
   * Joins two strings using a separator.
   * If the separator occurs at the concatenation boundary in either of the strings, it is removed.
   * This prevents accidental duplication of the separator.
   *
   * @param {String} part1 First string.
   * @param {String} separator Separator used for joining.
   * @param {String} part2 Second string.
   *
   * @returns {String} Joined string.
   *
   * @example
   * ```ts
   * join('first/', '/', '/second')
   * // -> 'first/second'
   * ```
   */
  declare function join(
    part1: string,
    separator: string,
    part2: string
  ): string;

  export {
    ParamMap,
    UrlCatConfiguration,
    configure,
    urlcat as default,
    join,
    query,
    subst,
  };
}
