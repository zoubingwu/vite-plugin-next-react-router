import path from 'path';
import { test, expect, beforeEach } from 'vitest';
import { ResolvedOptions } from './types';
import { Context } from './context';

const pageDir = 'examples/react/src/pages';

let context: Context;

beforeEach(() => {
  context = new Context({ pageDir });
});

test('context:resolveOptions', () => {
  const options = context.resolveOptions();
  expect(options.root).toBe('.');
  expect(options.pageDir).toBe(pageDir);
  expect(options.layout).toBe('_layout');
});

test('context:search', () => {
  context.resolveOptions();
  const pages = context.search();
  expect(pages.size).toBe(9);
});
