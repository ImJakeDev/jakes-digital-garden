import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getAllArticles() {
  const articlesDirectory = path.join(process.cwd(), 'content/articles');
  const filenames = fs.readdirSync(articlesDirectory);

  const articles = filenames.map((filename) => {
    const filePath = path.join(articlesDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug: filename.replace('.mdx', ''),
      title: data.title,
      description: data.description,
      plantedOn: data.plantedOn,
    };
  });

  return articles.sort((a, b) => {
    if (a.plantedOn < b.plantedOn) {
      return 1;
    } else {
      return -1;
    }
  });
}
