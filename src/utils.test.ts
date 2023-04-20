import { test, expect } from 'vitest';
import * as utils from './utils';

test('utils:isCatchAllRoute', () => {
  expect(utils.isCatchAll('')).toBe(false);
  expect(utils.isCatchAll('all')).toBe(false);
  expect(utils.isCatchAll('[.all]')).toBe(false);
  expect(utils.isCatchAll('[..all]')).toBe(false);
  expect(utils.isCatchAll('[...all]')).toBe(true);
});

test('utils:isDynamicRoute', () => {
  expect(utils.isDynamic('')).toBe(false);
  expect(utils.isDynamic('topic')).toBe(false);
  expect(utils.isDynamic('[...all]')).toBe(true);
  expect(utils.isDynamic('[id]')).toBe(true);
});

test('utils:normalizeFilenameToRoute', () => {
  expect(utils.normalizeFilenameToRoute('topic')).toBe('topic');
  expect(utils.normalizeFilenameToRoute('index')).toBe('/');
  expect(utils.normalizeFilenameToRoute('[id]')).toBe(':id');
  expect(utils.normalizeFilenameToRoute('[id]')).toBe(':id');
});

test('utils:parameterizeDynamicRoute', () => {
  expect(utils.parameterizeDynamicRoute('[b]')).toBe(':b');
});

test('utils:normalizeDirPathToRoute', () => {
  expect(utils.normalizeDirPathToRoute('topic')).toBe('topic');
  expect(utils.normalizeDirPathToRoute('topic/[id]/content')).toBe(
    'topic/:id/content'
  );
});

test('utils:normalizePathToRoute', () => {
  expect(utils.normalizePathToRoute('index.tsx')).toBe('/');
  expect(utils.normalizePathToRoute('index/index.tsx')).toBe('/index');
  expect(utils.normalizePathToRoute('index/topic.tsx')).toBe('/index/topic');
  expect(utils.normalizePathToRoute('index/topic/[id].tsx')).toBe(
    '/index/topic/:id'
  );
  expect(utils.normalizePathToRoute('/topic/component/index.tsx')).toBe(
    '/topic/component'
  );
  expect(utils.normalizePathToRoute('/[id]/user.tsx')).toBe('/:id/user');
});

test('utils:sortRoutes', () => {
  expect(utils.sortRoutes(['/a', '/b', '/a/b', '/'])).toStrictEqual([
    '/',
    '/a',
    '/b',
    '/a/b',
  ]);
});

test('utils:getComponentName', () => {
  expect(utils.getComponentName('settings/articles/index.tsx')).toBe(
    'SettingsArticlesIndex'
  );
  expect(utils.getComponentName('articles/[id].tsx')).toBe('ArticlesId');
});

test('utils:removePathExtname', () => {
  expect(utils.stripExt('/a/b.tsx')).toBe('/a/b');
  expect(utils.stripExt('/a/b.js')).toBe('/a/b');
  expect(utils.stripExt('/a/b')).toBe('/a/b');
  expect(utils.stripExt('/a/')).toBe('/a/');
});
