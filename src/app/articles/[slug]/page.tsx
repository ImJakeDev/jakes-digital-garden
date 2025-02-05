import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import PageContainer from '@/components/layouts/PageContainer';
import { css } from '@linaria/core';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const articlesDirectory = path.join(process.cwd(), 'content/articles');
  const filenames = fs.readdirSync(articlesDirectory);

  return filenames.map((filename) => ({
    params: { slug: filename.replace('.mdx', '') },
  }));
}

export default async function ArticlePage({ params }: PageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const articleFilePath = path.join(process.cwd(), 'content/articles', `${slug}.mdx`);

  if (!fs.existsSync(articleFilePath)) {
    return (
      <PageContainer>
        <h3>Article not found</h3>
      </PageContainer>
    );
  }

  const articleContent = fs.readFileSync(articleFilePath, 'utf-8');
  const { data, content } = matter(articleContent);

  return (
    <PageContainer>
      <article className={articleStyles}>
        <h1>{data.title}</h1>
        <span>Planted on: {data.plantedOn}</span>
        <MDXRemote source={content} />
      </article>
    </PageContainer>
  );
}

const articleStyles = css`
  display: flex;
  align-self: center;
  flex-direction: column;
  gap: var(--space-s-m);
`;
