'use client';
import { useSearchParams } from 'next/navigation';
import PageContainer from '@/components/layouts/PageContainer';
import usePokémon from '@/services/hooks/usePokémon';
import toTitleCase from '@/utils/toTitleCase';
import { Suspense } from 'react';

function SearchForPokémon() {
  // Example url: http://localhost:3000/pokemon?name=pikachu
  const searchParams = useSearchParams();
  const dynamicName = searchParams.get('name');

  const { data: pokémon, isLoading, error } = usePokémon(dynamicName ?? '');

  if (isLoading) return <PageContainer>Loading...</PageContainer>;
  if (error) return <PageContainer>Error: {error.message}</PageContainer>;
  if (!pokémon) return <PageContainer>No name provided</PageContainer>;

  return (
    <>
      <h1>Results for: {toTitleCase(pokémon.name)}</h1>
      {/* // Todo: Render data here */}
    </>
  );
}

export default function PokémonPage() {
  return (
    <PageContainer>
      <Suspense fallback={<em>Loading...</em>}>
        <SearchForPokémon />
      </Suspense>
    </PageContainer>
  );
}
