import usePokémon from '@/services/hooks/usePokémon';
import Image from 'next/image';
import { css } from '@linaria/core';
import toTitleCase from '@/utils/toTitleCase';
import LoadingIndicator from './LoadingIndicator';

export default function Pokémon() {
  const { data: pokémon, isLoading: isLoadingPokémon } = usePokémon();

  if (isLoadingPokémon) {
    return <LoadingIndicator />;
  }

  if (!pokémon) {
    return null;
  }

  return (
    <>
      <div className={pokémonContainer}>
        <span className="pokémon-wrapper">
          <button popoverTarget="pokémon-tooltip" className="pokémon" popoverTargetAction="toggle">
            <Image src={pokémon.sprites.front_default ?? ''} alt={pokémon.name} width={96} height={96} priority={false} />
          </button>
        </span>
        <div id="pokémon-tooltip" popover="manual">
          <span>Hi from {toTitleCase(pokémon.name)}!</span>
        </div>
      </div>
    </>
  );
}

const pokémonContainer = css`
  position: relative;

  .pokémon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-3xs);
  }

  .pokémon {
    anchor-name: --pokémon-anchor-btn;
  }

  [popover] {
    --tether-offset: 1px;
    --tether-size: 8px;

    position-anchor: --pokémon-anchor-btn;
    position: absolute;
    position-area: top;
    position-try: --bottom, --left, --right;

    margin: 0 0 var(--tether-size) 0;
    clip-path: inset(var(--tether-offset)) margin-box;

    /* need this to see the tether */
    overflow: visible;

    max-width: 300px;

    background: var(--gray-7);
    color: var(--gray-2);
    border: none;
    padding: 1rem;
    border-radius: 1rem;

    &::before {
      content: '';
      position: absolute;
      z-index: -1;
      inset: calc(-1 * var(--tether-size)) calc(50% - var(--tether-size));
      background: inherit;
      clip-path: polygon(0 var(--tether-size), 50% 0, 100% var(--tether-size), 100% calc(100% - var(--tether-size)), 50% 100%, 0 calc(100% - var(--tether-size)));
    }

    &::after {
      content: '';
      position: absolute;
      z-index: -1;
      inset: calc(50% - var(--tether-size)) calc(-1 * var(--tether-size));
      background: inherit;
      clip-path: polygon(0 var(--tether-size), var(--tether-size) 0, calc(100% - var(--tether-size)) 0, 100% 50%, calc(100% - var(--tether-size)) 100%, var(--tether-size) 100%);
    }
  }

  @position-try --bottom {
    position-area: bottom;
    margin: 0.5rem 0 0;
  }

  @position-try --left {
    position-area: left;
    margin: 0 0.5rem 0 0;
  }

  @position-try --right {
    position-area: right;
    margin: 0 0 0 0.5rem;
  }
`;
