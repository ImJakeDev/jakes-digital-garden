'use client';

import toTitleCase from '@/utils/toTitleCase';
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

  const handleCopyColorVar = (color: string, number: number) => {
    const colorVariable = `var(--${color}-${number})`;
    navigator.clipboard
      .writeText(colorVariable)
      .then(() => {
        // Todo: Add some feedback like a toast notification
        console.log(`Copied ${colorVariable} to clipboard`);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  };

  return (
    <section>
      <h3>Colors:</h3>
      {COLORS.map((color, index) => {
        return (
          <ul key={index} className={colorSwatchList}>
            <h4>{toTitleCase(color)}:</h4>
            {colorValueRanges.map((number, index) => {
              return (
                <li key={index}>
                  <ColorSwatch number={number} color={color} aria-label={`${color} ${number}`} onClick={() => handleCopyColorVar(color, number)}>
                    {number}
                  </ColorSwatch>
                </li>
              );
            })}
          </ul>
        );
      })}
    </section>
  );
}

const colorSwatchList = css`
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: repeat(auto-fit, minmax(8ch, 1fr));
  padding: 0;

  h4 {
    overflow-wrap: unset;
    align-self: center;
  }

  li {
    display: flex;
    flex: auto;
    padding: 0;
    list-style: none;
  }
`;

const ColorSwatch = styled.button<ColorSwatchProps>`
  background-color: ${(props) => `var(--${props.color}-${props.number})`};
  display: flex;
  flex: auto;
  color: ${(props) => {
    const invertedNumber = COLORS_COUNT - 1 - props.number;
    return `var(--${props.color === 'gray' ? 'stone' : 'gray'}-${invertedNumber})`;
  }};
  text-shadow: ${(props) => {
    const invertedNumber = COLORS_COUNT - 1 - props.number;
    return `var(--${props.color === 'gray' ? 'stone' : 'gray'}-${invertedNumber})`;
  }};
  border-color: ${(props) => {
    const invertedNumber = COLORS_COUNT - 1 - props.number;
    return `var(--${props.color === 'gray' ? 'stone' : 'gray'}-${invertedNumber})`;
  }};
  transform: scale(1);
  transition: transform 2000ms var(--ease-elastic-4);

  &:hover {
    transform: scale(1.4);
    transition: transform 1000ms var(--ease-elastic-4) var(--animation-delay-2);
  }
`;
