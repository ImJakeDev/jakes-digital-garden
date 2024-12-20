import useRandomEmoji from '@/hooks/useRandomEmoji';
import useEmojiData from '@/services/hooks/useEmojisData';
import { styled } from '@linaria/react';

export default function Footer() {
  const { data, isLoading } = useEmojiData();

  console.log('data', data);
  console.log('isLoading', isLoading);

  const randomEmojiHexCode = useRandomEmoji();

  return (
    <StyledFooter>
      <StyledFooterContainer>
        <span>Made with {randomEmojiHexCode} by Jake</span>
        <span>•</span>
        <em>© 2024 Jake Unplugged</em>
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
