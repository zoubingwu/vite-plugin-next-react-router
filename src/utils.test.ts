import {
  getComponentName,
  isCatchAll,
  isDynamic,
  normalizeDirPathToRoute,
  normalizeFilenameToRoute,
  normalizePathToRoute,
} from './utils';

test('utils:isCatchAllRoute', () => {
  expect(isCatchAll('')).toBe(false);
  expect(isCatchAll('all')).toBe(false);
  expect(isCatchAll('[.all]')).toBe(false);
  expect(isCatchAll('[..all]')).toBe(false);
  expect(isCatchAll('[...all]')).toBe(true);
});

test('utils:isDynamicRoute', () => {
  expect(isDynamic('')).toBe(false);
  expect(isDynamic('topic')).toBe(false);
  expect(isDynamic('[...all]')).toBe(true);
  expect(isDynamic('[id]')).toBe(true);
});

test('utils:normalizeFilenameToRoute', () => {
  expect(normalizeFilenameToRoute('topic')).toBe('topic');
  expect(normalizeFilenameToRoute('index')).toBe('/');
  expect(normalizeFilenameToRoute('[id]')).toBe(':id');
  expect(normalizeFilenameToRoute('[id]')).toBe(':id');
});

test('utils:normalizeDirPathToRoute', () => {
  expect(normalizeDirPathToRoute('topic')).toBe('topic');
  expect(normalizeDirPathToRoute('topic/[id]/content')).toBe(
    'topic/:id/content'
  );
});

test('utils:normalizePathToRoute', () => {
  expect(normalizePathToRoute('index.tsx')).toBe('/');
  expect(normalizePathToRoute('index/index.tsx')).toBe('/index');
  expect(normalizePathToRoute('index/topic.tsx')).toBe('/index/topic');
  expect(normalizePathToRoute('index/topic/[id].tsx')).toBe('/index/topic/:id');
  expect(normalizePathToRoute('/topic/component/index.tsx')).toBe(
    '/topic/component'
  );
  expect(normalizePathToRoute('/[id]/user.tsx')).toBe('/:id/user');
});

test('utils:getComponentName', () => {
  expect(getComponentName('settings/articles/index.tsx')).toBe(
    'SettingsArticlesIndex'
  );
  expect(getComponentName('articles/[id].tsx')).toBe('ArticlesId');
});
