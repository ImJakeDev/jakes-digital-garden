import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import PageContainer from '@/components/layouts/PageContainer';
import { css } from '@linaria/core';

export default async function AboutPage() {
  const aboutFilePath = path.join(process.cwd(), 'content/pages/about.mdx');
  const fileContent = fs.readFileSync(aboutFilePath, 'utf-8');
  const { content } = matter(fileContent);

  return (
    <PageContainer>
      <article className={articleStyles}>
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
