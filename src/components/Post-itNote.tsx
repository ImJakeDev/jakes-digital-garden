import { css } from '@linaria/core';

interface PostItNoteProps {
  title: string;
  description: string;
}

export default function PostItNote({ title, description }: PostItNoteProps) {
  // Todo: Work on styles.
  return (
    <div className={PostItNoteStyles}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

const PostItNoteStyles = css`
  color: var(--gray-8);
  background-color: var(--yellow-2);
  box-shadow: var(--shadow-1);
  padding: var(--size-fluid-2);
  max-width: var(--size-content-2);
`;
