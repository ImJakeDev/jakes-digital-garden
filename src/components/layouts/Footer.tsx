import useRandomEmoji from '@/hooks/useRandomEmoji';
import usePokémon from '@/services/hooks/usePokémon';
import { styled } from '@linaria/react';
import Image from 'next/image';

export default function Footer() {
  // Todo: Enhance this feature to display a random Pokémon image or build an input to search for a specific Pokémon
  const { data: Quagsire, isLoading } = usePokémon('quagsire');

  console.log('data', Quagsire);
  console.log('isLoading', isLoading);

  const randomEmojiHexCode = useRandomEmoji();

  return (
    <StyledFooter>
      <StyledFooterContainer>
        <span>Made with {randomEmojiHexCode} by Jake</span>
        <span>•</span>
        <em>© 2024 Jake Unplugged</em>
        {!isLoading && <Image src={Quagsire?.sprites.front_default} alt="Quagsire" width={96} height={96} />}
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
