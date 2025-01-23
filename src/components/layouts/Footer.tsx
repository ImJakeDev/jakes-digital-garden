import useRandomEmoji from '@/services/hooks/useRandomEmoji';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';
import { format } from 'date-fns';
import Pokémon from '@/components/Pokémon';
import SocialList from '@/components/SocialList';

export default function Footer() {
  const { data: randomEmoji, isLoading: isLoadingRandomEmoji } = useRandomEmoji({});

  const now = new Date();

  const startsWithVowel = (word: string) => {
    // Todo: Refactor this to make it more linguistically accurate
    return ['a', 'e', 'i', 'o', 'u'].some((vowel) => word.startsWith(vowel));
  };

  // Todo: Make the strings accessible and easier to copy n' paste and translatable and add aria-labels, they are very hacky right now

  return (
    <StyledFooter>
      <StyledFooterContainer>
        {isLoadingRandomEmoji && <span>Loading...</span>}
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
      <SocialList />
      <Pokémon />
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
// Todo: Refactor this to use the same CSS to be more modular and reusable
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
