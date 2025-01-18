'use client';
import { useSearchParams } from 'next/navigation';
import PageContainer from '@/components/layouts/PageContainer';
import usePokémon from '@/services/hooks/usePokémon';
import toTitleCase from '@/utils/toTitleCase';
import { Suspense } from 'react';
import Image from 'next/image';
import TCGdex from '@tcgdex/sdk';
import { useQuery } from '@tanstack/react-query';

const tcgdex = new TCGdex('en');

function SearchForPokémon() {
  // Example url: http://localhost:3000/pokemon?name=pikachu
  const searchParams = useSearchParams();
  const dynamicName = searchParams.get('name');

  const { data: pokémon, isLoading: isLoadingPokémon, error: errorPokémon } = usePokémon(dynamicName ?? '');

  // Todo: Make into custom hook
  const {
    data: tcgdexData,
    isLoading: isLoadingTCGdex,
    error: errorTCGdex,
  } = useQuery({
    queryKey: ['TCGdex', dynamicName],
    queryFn: () => tcgdex.card.get(dynamicName ?? ''),
  });

  console.log('isLoadingTCGdex', isLoadingTCGdex);
  console.log('errorTCGdex', errorTCGdex);

  if (isLoadingPokémon) return <PageContainer>Loading...</PageContainer>;
  if (errorPokémon) return <PageContainer>Error: {errorPokémon.message}</PageContainer>;
  if (!pokémon) return <PageContainer>No name provided</PageContainer>;

  const pokémonImage = pokémon.sprites.front_default ?? '';
  const tcgdexImage = tcgdexData?.getImageURL() ?? '';

  return (
    <>
      <h1>{toTitleCase(pokémon.name)}</h1>
      {!!pokémonImage.length && <Image src={pokémonImage} alt={pokémon.name} width={96} height={96} priority={true} />}
      {!!tcgdexImage.length && !errorTCGdex && <Image src={tcgdexImage} alt={pokémon.name} width={200} height={300} priority={true} />}
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
