'use client';

import { css } from '@linaria/core';

interface LoadingIndicatorProps {
  text?: string;
}

export default function LoadingIndicator({ text }: LoadingIndicatorProps = {}) {
  return <strong className={LoadingIndicatorStyles}>Loading{text ? ' ' + text : ''}</strong>;
}

const LoadingIndicatorStyles = css`
  font-family: var(--fira-code), monospace;
  text-transform: uppercase;
  font-variant-ligatures: no-contextual;

  &::after {
    animation: dots 1.95s steps(4) infinite;
    content: ' ';
    display: inline-block;
    padding-inline-start: 0.25ch;
    text-align: left;
  }

  @keyframes dots {
    25% {
      content: '.';
    }
    50% {
      content: '..';
    }
    75%,
    100% {
      content: '...';
    }
  }
`;
