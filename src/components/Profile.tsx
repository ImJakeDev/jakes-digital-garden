'use client';

import useRandom5eSpecies from '@/services/hooks/useRandom5eSpecies';
import LoadingIndicator from './LoadingIndicator';
import { css } from '@linaria/core';
import { useDnD5eAllRaces, useDnD5eRace, useDnD5eSubrace, useDnD5eRacesProficiencies, useDnD5eRacesTraits } from '@/services/hooks/useDnD5eRaces';

export default function Profile() {
  const { data: Random5eSpeciesData, error: Random5eSpeciesError, isLoading: isLoadingRandom5eSpecies } = useRandom5eSpecies();
  const { data: DnD5eRacesData } = useDnD5eAllRaces();
  const { data: DnD5eRaceData } = useDnD5eRace('dragonborn');
  const { data: DnD5eSubraceData } = useDnD5eSubrace('elf');
  const { data: DnD5eRacesProficienciesData } = useDnD5eRacesProficiencies('dwarf');
  const { data: DnD5eRacesTraitsData } = useDnD5eRacesTraits('gnome');

  console.log('DnD5eRacesData:', DnD5eRacesData);
  console.log('DnD5eRaceData:', DnD5eRaceData);
  console.log('DnD5eSubraceData:', DnD5eSubraceData);
  console.log('DnD5eRacesProficienciesData:', DnD5eRacesProficienciesData);
  console.log('DnD5eRacesTraitsData:', DnD5eRacesTraitsData);

  if (isLoadingRandom5eSpecies) {
    return <LoadingIndicator />;
  }

  if (Random5eSpeciesError || !Random5eSpeciesData) {
    return (
      <div className="">
        <p>Error loading species data: {Random5eSpeciesError?.message ?? 'No data.'}</p>
      </div>
    );
  }

  // return (
  //   <div className="flow">
  //     <h1 className="">Species: {data.name}</h1>
  //     <p className="">{data.desc}</p>
  //     {!!data.traits?.length && (
  //       <ol className="flow">
  //         {data.traits.map((trait) => (
  //           <li key={trait.name} className="flow">
  //             <strong className="">{trait.name}:</strong>
  //             <p className="">{trait.desc}</p>
  //           </li>
  //         ))}
  //       </ol>
  //     )}
  //   </div>
  // );

  return (
    <div className={`grid | container | ${GridStyles}`} data-rows="masonry">
      <div className={`${GridItemOutlineStyles} | ${GridItemSpanColStyles}`}>{Random5eSpeciesData?.name}</div>
      <div className={GridItemOutlineStyles}>asdf</div>
      <div className={GridItemOutlineStyles} style={{ height: '200px' }}>
        asdf
      </div>
      <div className={GridItemOutlineStyles}>asdf</div>
      <div className={GridItemOutlineStyles}>asdf</div>
    </div>
  );
}

const GridStyles = css`
  --grid-placement: 3;
  --grid-min-item-size: 1ch;
  --grid-gap: 2px;
`;

const GridItemOutlineStyles = css`
  outline: 2px solid red;
`;

const GridItemSpanColStyles = css`
  grid-column: 1 / -1;
`;
