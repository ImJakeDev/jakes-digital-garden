'use client';
import { useSearchParams } from 'next/navigation';
import PageContainer from '@/components/layouts/PageContainer';
import usePokémon from '@/services/hooks/usePokémon';
import toTitleCase from '@/utils/toTitleCase';
import { Suspense } from 'react';
import Image from 'next/image';
import TCGdex from '@tcgdex/sdk';
import { useQuery } from '@tanstack/react-query';
import { css } from '@linaria/core';

const tcgdex = new TCGdex('en');

function SearchForPokémon() {
  // Example url: http://localhost:3000/pokemon?name=pikachu
  // Todo: This needs work because of a none search param url for main url of this page: http://localhost:3000/pokemon
  // For now, it will default to pikachu
  // Todo: maybe it needs to be a general search rather than a url search param?
  const searchParams = useSearchParams();
  const dynamicName = searchParams.get('name');

  const { data: pokémon, isLoading: isLoadingPokémon, error: errorPokémon } = usePokémon(dynamicName ?? 'pikachu');

  // Todo: Make into custom hook
  const {
    data: tcgdexData,
    isLoading: isLoadingTCGdex,
    error: errorTCGdex,
  } = useQuery({
    queryKey: ['TCGdex', dynamicName],
    queryFn: () => tcgdex.card.get(dynamicName ?? 'pikachu'),
  });

  if (isLoadingPokémon) return <PageContainer>Loading...</PageContainer>;
  if (errorPokémon) return <PageContainer>Error: {errorPokémon.message}</PageContainer>;
  if (!pokémon) return <PageContainer>No name provided</PageContainer>;

  const pokémonFrontImage = pokémon.sprites.front_default ?? '';
  const pokémonBackImage = pokémon.sprites.back_default ?? '';
  const tcgdexImage = tcgdexData?.getImageURL('high', 'webp') ?? '';

  return (
    <>
      <h1>{toTitleCase(pokémon.name)}</h1>
      {isLoadingPokémon && <em>Loading Pokèmon...</em>}
      <div className={rowStyles}>
        {!!pokémonFrontImage.length && <Image src={pokémonFrontImage} alt={pokémon.name} width={96} height={96} priority={true} />}
        {!!pokémonBackImage.length && <Image src={pokémonBackImage} alt={pokémon.name} width={96} height={96} priority={true} />}
      </div>
      {isLoadingTCGdex && <em>Loading TCGdex...</em>}
      {!!tcgdexImage.length && !errorTCGdex && !isLoadingTCGdex && <Image src={tcgdexImage} alt={pokémon.name} width={200} height={300} priority={true} />}
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

const rowStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
