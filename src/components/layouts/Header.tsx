import { styled } from '@linaria/react';

export default function Header() {
  return (
    <StyledHeader>
      <StyledHeaderContainer>
        <h1>Jake Unplugged</h1>
      </StyledHeaderContainer>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  border-bottom: 1px solid var(--color-border);
  padding-block: var(--space-l-xl);
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
