import { getAllPosts, PostMeta } from '@/utils/getAllPosts';
import Card from '@/components/Card';
import PageContainer from '@/components/layouts/PageContainer';
import { getQueryClient } from './get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { randomPokémonOptions } from '@/services/hooks/useRandomPokémon';

export default async function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(randomPokémonOptions);

  const posts: PostMeta[] = getAllPosts();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageContainer>
        {/* // Todo: Build Intro Message Section */}
        {/* // Todo: Build The Digital Garden Section */}
        <div>{posts.length > 0 ? posts.map((post) => <Card key={post.slug} title={post.title} description={post.description} tags={post.tags} slug={post.slug} />) : <p>No blog posts found.</p>}</div>
      </PageContainer>
    </HydrationBoundary>
  );
}
