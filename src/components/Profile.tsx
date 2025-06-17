'use client';

import useRandom5eSpecies from '@/services/hooks/useRandom5eSpecies';
import LoadingIndicator from './LoadingIndicator';
import { css } from '@linaria/core';
import { useDnD5eRaces, useDnD5eRacesByIndex } from '@/services/hooks/useDnD5eRaces';

export default function Profile() {
  const { data, error, isLoading } = useRandom5eSpecies();
  const { data: DnD5eRacesData, error: DnD5eRacesError, isLoading: isLoadingDnD5eRacesData } = useDnD5eRaces();
  const { data: DnD5eRacesByIndexData, error: DnD5eRacesByIndexError, isLoading: isLoadingDnD5eRacesByIndexData } = useDnD5eRacesByIndex('dragonborn');

  console.log('DnD5eRacesData:', DnD5eRacesData);
  console.log('DnD5eRacesError:', DnD5eRacesError);
  console.log('isLoadingDnD5eRacesData:', isLoadingDnD5eRacesData);
  console.log('DnD5eRacesByIndexData:', DnD5eRacesByIndexData);
  console.log('DnD5eRacesByIndexError:', DnD5eRacesByIndexError);
  console.log('isLoadingDnD5eRacesByIndexData:', isLoadingDnD5eRacesByIndexData);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error || !data) {
    return (
      <div className="">
        <p>Error loading species data: {error?.message ?? 'No data.'}</p>
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
      <div className={`${GridItemOutlineStyles} | ${GridItemSpanColStyles}`}>asdf</div>
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
