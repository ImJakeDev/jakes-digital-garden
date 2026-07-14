import { MDXRemote } from 'next-mdx-remote/rsc';
import PageContainer from '@/components/layouts/PageContainer';
import { getPageContent } from '@/utils/content';
import { notFound } from 'next/navigation';

export default async function AboutPage() {
  const about = getPageContent('about');

  if (!about) {
    notFound();
  }

  return (
    <PageContainer>
      <article className="flow">
        <MDXRemote source={about.content} />
      </article>
    </PageContainer>
  );
}
