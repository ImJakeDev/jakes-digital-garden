import { css } from '@linaria/core';

interface CardProps {
  title: string;
  description: string;
}

export default function Card({ title, description }: CardProps) {
  return (
    <div className={CardStyles}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

const CardStyles = css`
  background-color: var(--surface-3);
  box-shadow: var(--shadow-1);
  border-radius: var(--radius-drawn-3);
  border: var(--border-size-2) solid var(--gray-6);
  padding: var(--size-fluid-2);
  max-width: var(--size-content-2);

  &:hover {
    box-shadow: var(--shadow-3);
    background-color: var(--surface-4);
  }
`;
