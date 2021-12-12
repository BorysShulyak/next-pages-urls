import fetch from 'cross-fetch';

import {
  filterFileBasedRoutingPaths,
  generateEndpointsFromFileBasedRoutingPaths,
  generateFileBasedRoutingRootPath,
  generatePagesUrls,
  readFileBasedRoutingPaths
} from './endpointsGenerating/index.js';

const DYNAMIC_ROUTES_REGEXES = [/\[\.\.\.[A-Za-x]+]/, /\[\[\.\.\.[A-Za-x]+]]/];

const fetchNextAppPages = (appUrl, locales, dynamicSlugsMap, appDirPath, fileRegexesToFilter) => {
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

  pagesDirectUrls.forEach(async (pageUrl) => {
    try {
      await fetch(pageUrl);
    } catch (error) {
      throw new Error(`The request for direct page url ${pageUrl} was failed: ${error}`);
    }
  });

  dynamicSlugsMap.forEach(({ route, slugs }) => {
    locales.forEach(async (locale) => {
      const pageUrl = `${appUrl}/${locale}/${route}/${slugs[0]}`;
      try {
        await fetch(pageUrl);
      } catch (error) {
        throw new Error(`The request for dynamic page url ${pageUrl} was failed: ${error}`);
      }
    });
  });
};

export default fetchNextAppPages;
