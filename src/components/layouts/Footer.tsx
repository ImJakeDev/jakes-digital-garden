import usePokémon from '@/services/hooks/usePokémon';
import useRandomEmoji from '@/services/hooks/useRandomEmoji';
import { styled } from '@linaria/react';
import Image from 'next/image';

export default function Footer() {
  // Todo: Enhance this feature to display a random Pokémon image or build an input to search for a specific Pokémon
  const { data: Quagsire, isLoading: isLoadingQuagsire } = usePokémon('quagsire');
  const { data: randomEmoji, isLoading: isLoadingRandomEmoji } = useRandomEmoji({});

  console.log('Quagsire', Quagsire);
  console.log('isLoadingQuagsire', isLoadingQuagsire);

  console.log('randomEmoji', randomEmoji);
  console.log('isLoadingRandomEmoji', isLoadingRandomEmoji);

  return (
    <StyledFooter>
      <StyledFooterContainer>
        {!!randomEmoji && <span>Made with {randomEmoji.emoji} by Jake</span>}
        <span>•</span>
        <em>© 2024 Jake Unplugged</em>
        {!!Quagsire && <Image src={Quagsire.sprites.front_default} alt="Quagsire" width={96} height={96} />}
      </StyledFooterContainer>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  border-top: 1px solid var(--color-border);
  padding-block: var(--space-l-xl);
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
