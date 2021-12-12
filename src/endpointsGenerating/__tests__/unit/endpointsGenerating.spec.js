import {
  filterFileBasedRoutingPaths,
  generateEndpointsFromFileBasedRoutingPaths,
  generateFileBasedRoutingRootPath,
  generatePagesUrls
} from '../../endpointsGenerating.js';

describe('generateFileBasedRoutingRootPath', () => {
  it('should generate the full pass to next.js file-based routing root', () => {
    const mockAppDirPath = 'apps/my-app/';
    const fileBasedRoutingRootPath = generateFileBasedRoutingRootPath(mockAppDirPath);
    expect(fileBasedRoutingRootPath).toEqual(`${mockAppDirPath}src/pages`);
  });
});

describe('filterFileBasedRoutingPaths', () => {
  it('should filter file based routing paths by provided regexes', function () {
    const mockFileBasedRoutingPaths = [
      'apps/my-app/src/pages/index.jsx',
      'apps/my-app/src/pages/my-account.jsx',
      'apps/my-app/src/pages/api/custom-api.jsx',
      'apps/my-app/src/pages/_app.jsx',
      'apps/my-app/src/pages/_document.jsx',
      'apps/my-app/src/pages/_document.jsx',
      'apps/my-app/src/pages/game/[...slug].jsx'
    ];
    const mockDevFilesRegexes = [/pages\/_app/, /pages\/_document/, /pages\/api/, /\/\./];
    const filteredFileBasedRoutingPaths = filterFileBasedRoutingPaths(
      mockFileBasedRoutingPaths,
      mockDevFilesRegexes
    );
    expect(filteredFileBasedRoutingPaths).toEqual([
      'apps/my-app/src/pages/index.jsx',
      'apps/my-app/src/pages/my-account.jsx',
      'apps/my-app/src/pages/game/[...slug].jsx'
    ]);
  });
});

describe('generateEndpointsFromFileBasedRoutingPaths', () => {
  it('should generate endpoint form file paths', () => {
    const mockFileBasedRoutingPaths = [
      'apps/my-app/src/pages/index.jsx',
      'apps/my-app/src/pages/my-account.jsx',
      'apps/my-app/src/pages/game/[...slug].jsx'
    ];
    const endpoints = generateEndpointsFromFileBasedRoutingPaths(mockFileBasedRoutingPaths);
    expect(endpoints).toEqual(['/', '/my-account', '/game/[...slug]']);
  });
});

describe('generatePagesUrls', () => {
  it('should generate ready to fetch pages urls', () => {
    const mockAppUrl = 'https://next-js-app.com';
    const mockLocales = ['en', 'ru'];
    const mockEndpoints = ['/', '/my-account', '/game/[...slug]'];
    const appPagesUrls = generatePagesUrls(mockAppUrl, mockLocales, mockEndpoints);
    expect(appPagesUrls).toEqual([
      'https://next-js-app.com/en/',
      'https://next-js-app.com/ru/',
      'https://next-js-app.com/en/my-account',
      'https://next-js-app.com/ru/my-account',
      'https://next-js-app.com/en/game/[...slug]',
      'https://next-js-app.com/ru/game/[...slug]'
    ]);
  });
});
