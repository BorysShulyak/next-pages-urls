import fetch from 'cross-fetch';

import {
  filterFileBasedRoutingPaths,
  generateEndpointsFromFileBasedRoutingPaths,
  generateFileBasedRoutingRootPath,
  generatePagesUrls,
  readFileBasedRoutingPaths
} from './endpointsGenerating/index.js';

const DYNAMIC_ROUTES_REGEXES = [/\[\.\.\.[A-Za-x]+]/, /\[\[\.\.\.[A-Za-x]+]]/];

const getNextAppPages = (appUrl, locales, dynamicSlugsMap, appDirPath, fileRegexesToFilter) => {
  const appUrls = [];

  const fileBasedRoutingRootPath = generateFileBasedRoutingRootPath(appDirPath);
  const fileBasedRoutingPaths = readFileBasedRoutingPaths(fileBasedRoutingRootPath);

  const filteredRoutingPaths = filterFileBasedRoutingPaths(
    fileBasedRoutingPaths,
    fileRegexesToFilter
  );

  const directRoutingPaths = filterFileBasedRoutingPaths(
    filteredRoutingPaths,
    DYNAMIC_ROUTES_REGEXES
  );
  const directEndpoints = generateEndpointsFromFileBasedRoutingPaths(directRoutingPaths);

  const pagesDirectUrls = generatePagesUrls(appUrl, locales, directEndpoints);
  appUrls.push(...pagesDirectUrls)

  for (const [route, slugs] of Object.entries(dynamicSlugsMap)) {
    locales.forEach(async (locale) => {
      const urlRoute = route === '/' ? '' : `${route}/`
      const pageUrl = `${appUrl}/${locale}/${urlRoute}${slugs[0]}`;
      appUrls.push(pageUrl);
    });
  }
  return appUrls;
};

export default getNextAppPages;
