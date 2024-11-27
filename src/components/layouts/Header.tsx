import { styled } from '@linaria/react';
import Link from 'next/link';

export default function Header() {
  return (
    <StyledHeader>
      <StyledHeaderContainer>
        <h1>
          <Link href="/">Jake Unplugged</Link>
        </h1>
        {/* // Todo: Build Pages */}
        <nav>
          <StyledNavigationOrderedList>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </StyledNavigationOrderedList>
        </nav>
      </StyledHeaderContainer>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  border-bottom: 1px solid var(--color-border);
  padding-block: var(--space-s-m);
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: var(--grid-max-width);
  padding-inline: var(--grid-gutter);
  margin-inline: auto;
`;

const StyledNavigationOrderedList = styled.ol`
  display: flex;
  flex-direction: row;
  gap: var(--space-s-m);
`;
