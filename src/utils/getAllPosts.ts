'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  img: string;
};

export async function getAllPosts(): Promise<PostMeta[]> {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    try {
      const { data } = matter(fileContent);

      // Todo: Update image feature
      // Correct fallback image path (omit "public/")
      const imageUrl = data.img || 'https://picsum.photos/200/300';

      return {
        slug: filename.replace('.mdx', ''),
        title: data.title,
        description: data.description,
        tags: data.tags || [],
        img: imageUrl,
      };
    } catch (error) {
      console.error(`Error processing file: ${filename}`, error);
      throw error;
    }
  });
}
