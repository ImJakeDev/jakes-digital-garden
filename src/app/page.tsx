import { getAllPosts, PostMeta } from '@/utils/getAllPosts';
import Card from '@/components/Card';
import PageContainer from '@/components/layouts/PageContainer';
import axios from 'axios';
import CaughtPokémons from '@/types/CaughtPokémons';
import { getQueryClient } from './get-query-client';
import { pokémonsOptions } from '@/services/hooks/usePokémons';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(pokémonsOptions);

  // Todo: Check url
  /**
   * If url is "/"
   * Then run permanentRedirect
   * New url will have the search params for random pokémon
   */
  // Todo: Need a list of pokémon to choose from and parse
  // Todo: This is a Server Component 🤔
  const posts: PostMeta[] = getAllPosts();

  const {
    data: { results: pokémons, next },
  }: { data: CaughtPokémons } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=100&limit=494`);

  const {
    data: { results: pokémonsPart2, next: nextPokémonsPart2 },
  }: { data: CaughtPokémons } = await axios.get(next ?? '');

  console.log('pokémons', pokémons);
  console.log('pokemonsPart2', pokémonsPart2);
  console.log('nextPokémonsPart2', nextPokémonsPart2);

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
