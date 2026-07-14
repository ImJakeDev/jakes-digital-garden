'use server';

import { getAllContentEntries, parsePlantedOn } from '@/utils/content';

export async function getAllArticles() {
  return getAllContentEntries('articles')
    .map(({ slug, data }) => ({
      slug,
      title: data.title,
      description: data.description,
      plantedOn: data.plantedOn,
    }))
    .sort((a, b) => parsePlantedOn(b.plantedOn) - parsePlantedOn(a.plantedOn));
}
