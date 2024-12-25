import usePokémon from '@/services/hooks/usePokémon';
import useRandomEmoji from '@/services/hooks/useRandomEmoji';
import { styled } from '@linaria/react';
import Image from 'next/image';
import { css } from '@linaria/core';
import { format } from 'date-fns';
import { useSuspenseQuery } from '@tanstack/react-query';
import { pokémonsOptions } from '@/services/hooks/usePokémons';

export default function Footer() {
  const {
    data: { results: Pokémons },
  } = useSuspenseQuery(pokémonsOptions);

  console.log('Pokémons', Pokémons);

  const randomPokémonsIndex = Math.floor(Math.random() * Pokémons.length);
  const randomPokémon = Pokémons[randomPokémonsIndex];

  // Todo: Enhance this feature to display a random Pokémon image or build an input to search for a specific Pokémon
  const { data: Quagsire, isLoading: isLoadingQuagsire } = usePokémon(randomPokémon.name);
  const { data: randomEmoji, isLoading: isLoadingRandomEmoji } = useRandomEmoji({});

  const now = new Date();

  console.log('Quagsire', Quagsire);
  console.log('isLoadingQuagsire', isLoadingQuagsire);

  console.log('randomEmoji', randomEmoji);
  console.log('isLoadingRandomEmoji', isLoadingRandomEmoji);

  const startsWithVowel = (word: string) => {
    // Todo: Refactor this to make it more linguistically accurate
    return ['a', 'e', 'i', 'o', 'u'].some((vowel) => word.startsWith(vowel));
  };

  // Todo: Make the strings accessible and easier to copy n' paste and translatable and add aria-labels, they are very hacky right now

  return (
    <StyledFooter>
      <StyledFooterContainer>
        {!!randomEmoji && (
          <div className={emojiContainer}>
            <span className="emoji-wrapper">
              Made with{' '}
              <button popoverTarget="emoji-tooltip" className="emoji" popoverTargetAction="toggle">
                {randomEmoji.emoji}
              </button>{' '}
              by Jake
            </span>
            <div id="emoji-tooltip" popover="manual">
              <span>
                {startsWithVowel(randomEmoji.label) ? 'an' : 'a'} {randomEmoji.label}
              </span>
            </div>
          </div>
        )}
        <span>•</span>
        <em>© {format(now, 'yyyy')} Jake&apos;s Digital Garden</em>
      </StyledFooterContainer>
      {!!Quagsire && (
        <>
          <div className={pokémonContainer}>
            <span className="pokémon-wrapper">
              <button popoverTarget="pokémon-tooltip" className="pokémon" popoverTargetAction="toggle">
                <Image src={Quagsire.sprites.front_default} alt="Quagsire" width={96} height={96} />
              </button>
            </span>
            <div id="pokémon-tooltip" popover="manual">
              <span>Hi from {Quagsire.name}!</span>
            </div>
          </div>
        </>
      )}
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  border-top: 1px solid var(--color-border);
  padding-block: var(--space-l-xl);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--space-l-xl);
`;

const StyledFooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-s-m);

  max-width: var(--grid-max-width);
  padding-inline: var(--grid-gutter);
  margin-inline: auto;
`;

/* https://codepen.io/wes_goulet/pen/GRVgyGq */
/* https://developer.mozilla.org/en-US/docs/Web/API/Popover_API */
/* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning */
const emojiContainer = css`
  position: relative;

  .emoji-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-3xs);
  }

  .emoji {
    anchor-name: --emoji-anchor-btn;

    /* font-size: 1rem; */
    /* border-radius: 2rem; */
    height: fit-content;
    width: fit-content;
    display: grid;
    border: none;
    place-content: center;
    background-color: transparent;

    cursor: pointer;
  }

  [popover] {
    --tether-offset: 1px;
    --tether-size: 8px;

    position-anchor: --emoji-anchor-btn;
    position: absolute;
    position-area: top;
    position-try: --bottom, --left, --right;

    margin: 0 0 var(--tether-size) 0;
    clip-path: inset(var(--tether-offset)) margin-box;

    /* need this to see the tether */
    overflow: visible;

    max-width: 300px;

    background: black;
    color: white;
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

// Todo: Refactor this to use the same CSS to be more modular and reusable

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

    /* font-size: 1rem; */
    /* border-radius: 2rem; */
    height: fit-content;
    width: fit-content;
    display: grid;
    border: none;
    place-content: center;
    background-color: transparent;

    cursor: pointer;
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

    background: black;
    color: white;
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
