import { MDXRemote } from 'next-mdx-remote/rsc';
import PageContainer from '@/components/layouts/PageContainer';
import { notFound } from 'next/navigation';
import { getAllContentEntries, getContentEntry } from '@/utils/content';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllContentEntries('articles').map(({ slug }) => ({ slug }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getContentEntry('articles', slug);

  if (!article) {
    notFound();
  }

  return (
    <PageContainer>
      <article className="flow">
        <h1>{article.data.title}</h1>
        <span>Planted on: {article.data.plantedOn}</span>
        <MDXRemote source={article.content} />
      </article>
    </PageContainer>
  );
}
