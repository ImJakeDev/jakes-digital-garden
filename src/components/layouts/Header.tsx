import { styled } from '@linaria/react';
import { css } from '@linaria/core';
import Link from 'next/link';

export default function Header() {
  return (
    <StyledHeader>
      <StyledHeaderContainer>
        <h1 className={headingStyles}>
          <Link href="/">Jake Unplugged</Link>
        </h1>
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

// Todo: Make better use of styles for global components and styles
const headingStyles = css`
  /* color: var(--color-dark-green); */
`;

const StyledHeader = styled.header`
  border-bottom: 1px solid var(--color-border);
  padding-block: var(--space-s-m);
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  max-width: var(--grid-max-width);
  padding-inline: var(--grid-gutter);
  margin-inline: auto;
`;

const StyledNavigationOrderedList = styled.ol`
  display: flex;
  flex-direction: row;
  gap: var(--space-s-m);
`;
