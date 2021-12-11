import { getAllFilesFromDir } from './fileUtils.js';

/**
 * Generate the full path to file-based routing (e.g. .../apps/<app>/src/pages/).
 * @param {String} appDirPath - Path to app directory from root of the project (e.g. apps/my-app/).
 * @return String - The path to file-based routing
 */
export const generateFileBasedRoutingRootPath = (appDirPath) => `${appDirPath}src/pages/`;

/**
 * Read and return the files paths from provided directory.
 * @param {String} fileBasedRoutingPath - The full path to file-based routing of some app.
 * @return Array<String>
 */
export const readFileBasedRoutingPaths = (fileBasedRoutingPath) =>
  getAllFilesFromDir(fileBasedRoutingPath);

/**
 * Read and return the files paths from provided directory.
 * @param {Array<String>} fileBasedRoutingPaths - The files paths.
 * @param {Array<RegExp>} routesRegexesToFilter - The array of regexes to filter fileBasedRoutingPaths.
 * @return Array<String> - Filtered files paths
 */
export const filterFileBasedRoutingPaths = (fileBasedRoutingPaths, routesRegexesToFilter) =>
  fileBasedRoutingPaths.filter((path) => !routesRegexesToFilter.some((regex) => regex.test(path)));

/**
 * Generate endpoint form file paths (e.g. => apps/white-label-casino/src/pages/[[...slug]].jsx => [[...slug]]).
 * @param {Array<String>} fileBasedRoutingPaths - The files paths.
 * @return Array<String> - The array of endpoints.
 */
export const generateEndpointsFromFileBasedRoutingPaths = (fileBasedRoutingPaths) =>
  fileBasedRoutingPaths.map((path) => path.split('pages/')[1].split(/(\/index)?.jsx?$/)[0]);

/**
 * @param {String} appUrl
 * @param {Array<String>} locales
 * @param {Array<String>} endpoints
 * @return Array<String>
 */
export const generatePagesUrls = (appUrl, locales, endpoints) => {
  const localizedEndpoints = endpoints.reduce((acc, endpoint) => {
    const localizedEndpoint = locales.map((locale) => `${locale}/${endpoint}`);
    return [...acc, ...localizedEndpoint];
  }, []);

  const pagesUrls = localizedEndpoints.map((localizedEndpoint) => `${appUrl}${localizedEndpoint}`);

  return pagesUrls;
};
