'use client';

import { css } from '@linaria/core';
import { styled } from '@linaria/react';

const COLORS = ['gray', 'stone', 'red', 'pink', 'purple', 'violet', 'indigo', 'blue', 'cyan', 'teal', 'green', 'lime', 'yellow', 'orange', 'choco', 'brown', 'sand', 'camo', 'jungle'] as const;

const COLORS_COUNT = 13 as const; // 0 - 12

type ColorSwatchProps = {
  color: string;
  number: number;
};

export default function Colors() {
  const colorValueRanges = [...Array(COLORS_COUNT).keys()];

  return (
    <>
      {COLORS.map((color, index) => {
        return (
          <ul key={index} className={colorSwatchList}>
            <h3>{color}</h3>
            {colorValueRanges.map((number, index) => {
              return (
                <li key={index}>
                  <ColorSwatch number={number} color={color} aria-label={`${color} ${number}`}>
                    {number}
                  </ColorSwatch>
                </li>
              );
            })}
          </ul>
        );
      })}
    </>
  );
}

const colorSwatchList = css`
  display: flex;
  flex-flow: row wrap;
  padding-inline-start: 0;

  li {
    list-style: none;
  }
`;

const ColorSwatch = styled.button<ColorSwatchProps>`
  background-color: ${(props) => `var(--${props.color}-${props.number})`};
  border-radius: var(--radius-round);
  box-shadow: var(--inner-shadow-0);
  inline-size: 100%;
  block-size: var(--size);
  display: grid;
  place-content: center;
  color: ${(props) => {
    const invertedNumber = COLORS_COUNT - 1 - props.number;
    return `var(--gray-${invertedNumber})`;
  }};
  text-shadow: var(--stone-4);
  transform: scale(1);
  transition: transform 800ms var(--ease-elastic-4);

  &:hover {
    transform: scale(1.4);
    transition: transform 800ms var(--ease-elastic-4) var(--animation-delay-2);
  }
`;
