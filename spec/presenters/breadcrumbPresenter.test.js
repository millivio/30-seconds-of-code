/* eslint-disable no-unused-vars */
import { describe, it, expect } from 'vitest';
import Loader from '#src/lib/loader.js';
import BreadcrumbPresenter from '#src/presenters/breadcrumbPresenter.js';
import settings from '#src/config/settings.js';

describe('BreadcrumbPresenter', () => {
  Loader.loadModules();
  const { CollectionFactory, SnippetFactory, CollectionSnippetFactory } =
    Loader.buildFactories();

  const primaryCollection = CollectionFactory.create('primary', {
    id: 'js',
    miniTitle: 'JavaScript',
  });
  const secondaryCollection = CollectionFactory.create('secondary', {
    id: 'js/c/array',
    parentId: 'js',
    miniTitle: 'Array',
  });
  const otherSecondaryCollection = CollectionFactory.create('secondary', {
    id: 'js/c/object',
    parentId: 'js',
    miniTitle: 'Object',
  });

  const snippet = SnippetFactory.create({
    id: 'js/s/my-snippet',
    shortTitle: 'My snippet',
    tags: 'array;object',
  });

  const snippetPresenter = new BreadcrumbPresenter(snippet);

  describe('breadcrumbs', () => {
    it('returns the breadcrumbs for a snippet', () => {
      expect(snippetPresenter.breadcrumbs).toEqual([
        settings.breadcrumbs.home,
        { url: '/js/p/1', name: 'JavaScript' },
        { url: '/js/c/array/p/1', name: 'Array' },
        { url: '/js/s/my-snippet', name: 'My snippet' },
      ]);
    });
  });

  describe('recommendedCollection', () => {
    it('returns the recommended collection for a snippet', () => {
      expect(snippetPresenter.recommendedCollection).toEqual(
        otherSecondaryCollection
      );
    });
  });
});
