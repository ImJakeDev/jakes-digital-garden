'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import PageContainer from '@/components/layouts/PageContainer';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    params: { slug: filename.replace('.mdx', '') },
  }));
}

// Change BlogPost to return a Promise
export default async function BlogPost({ params }: PageProps): Promise<JSX.IntrinsicElements> {
  const { slug } = await params;
  const postFilePath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`);

  // Check if the file exists
  if (!fs.existsSync(postFilePath)) {
    return (
      <PageContainer>
        <h3>Post not found</h3>
      </PageContainer>
    );
  }

  const postContent = fs.readFileSync(postFilePath, 'utf-8');
  const { data, content } = matter(postContent);

  return (
    <PageContainer>
      <article className="flow">
        <h1>{data.title}</h1>
        <span>Planted on: {data.plantedOn}</span>
        <MDXRemote source={content} />
      </article>
    </PageContainer>
  );
}
