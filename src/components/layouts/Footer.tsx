import { styled } from '@linaria/react';

export default function Footer() {
  return (
    <StyledFooter>
      <StyledFooterContainer>
        <span>Made with ✨ by Jake</span>
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
`;
