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
  return getAllContentEntries('blog').map(({ slug }) => ({ slug }));
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getContentEntry('blog', slug);

  if (!post) {
    notFound();
  }

  return (
    <PageContainer>
      <article className="flow">
        <h1>{post.data.title}</h1>
        <span>Planted on: {post.data.plantedOn}</span>
        <MDXRemote source={post.content} />
      </article>
    </PageContainer>
  );
}
