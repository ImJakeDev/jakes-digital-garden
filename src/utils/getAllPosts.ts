'use server';

import { getAllContentEntries } from '@/utils/content';

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  img: string;
}

export async function getAllPosts(): Promise<PostMeta[]> {
  return getAllContentEntries('blog').map(({ slug, data }) => ({
    slug,
    title: data.title,
    description: data.description,
    tags: data.tags,
    img: data.img || 'https://picsum.photos/200/300',
  }));
}
