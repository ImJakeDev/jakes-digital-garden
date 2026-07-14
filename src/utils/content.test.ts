import { describe, expect, it } from 'vitest';
import { getAllContentEntries, getContentEntry, getPageContent } from './content';

describe('content loader', () => {
  it('loads validated article and blog metadata', () => {
    const articles = getAllContentEntries('articles');
    const posts = getAllContentEntries('blog');

    expect(articles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          slug: 'growing-my-digital-garden',
          data: expect.objectContaining({ title: 'Growing My Digital Garden: A Quest for Authenticity' }),
        }),
      ])
    );
    expect(posts).toEqual(expect.arrayContaining([expect.objectContaining({ slug: 'hello-world' })]));
  });

  it('rejects unsafe slugs and loads page content', () => {
    expect(getContentEntry('articles', '../about')).toBeNull();
    expect(getPageContent('about')).toEqual(expect.objectContaining({ data: expect.objectContaining({ title: 'About' }) }));
  });
});
