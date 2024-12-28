import { getAllPosts, PostMeta } from '@/utils/getAllPosts';
import Card from '@/components/Card';
import PageContainer from '@/components/layouts/PageContainer';
import { getQueryClient } from './get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { randomPokémonOptions } from '@/services/hooks/useRandomPokémon';
import { css } from '@linaria/core';
import Link from 'next/link';

export default async function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(randomPokémonOptions);

  const posts: PostMeta[] = getAllPosts();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageContainer>
        <div>
          <p>Welcome to Jake&apos;s Digital Garden—a place where digital seeds are planted and nurtured to grow into creations that connect, inspire, and explore the intersections of technology, thoughts, and ideas.</p>
        </div>
        {/* // Todo: Build The Digital Garden Section */}
        <div className={SectionStyles}>
          <h2>Blog Posts:</h2>
          <ul className={BlogPostsStyles}>
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <Link key={index} href={`/blog/${post.slug}`}>
                  <li>
                    <Card title={post.title} description={post.description} tags={post.tags} />
                  </li>
                </Link>
              ))
            ) : (
              <li>
                <p>No blog posts found.</p>
              </li>
            )}
          </ul>
        </div>
      </PageContainer>
    </HydrationBoundary>
  );
}

const BlogPostsStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--space-m-l);
`;

const SectionStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--space-m-l);
`;
