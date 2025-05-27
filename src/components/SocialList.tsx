import { FaBluesky, FaGithub } from 'react-icons/fa6';
import { css } from '@linaria/core';
import Link from 'next/link';

export default function SocialList() {
  return (
    <ul className={SocialListStyles}>
      <li>
        <Link href="https://bsky.app/profile/jakeschaffer.bsky.social" target="_blank">
          <FaBluesky />
        </Link>
      </li>
      <li>
        <Link href="https://github.com/ImJakeDev" target="_blank">
          <FaGithub />
        </Link>
      </li>
    </ul>
  );
}

// Todo: Why is padding needed?
const SocialListStyles = css`
  display: flex;
  gap: var(--space-s-m);
  list-style: none;
  justify-content: 'center';
  align-items: 'center';
  padding: 0;

  li {
    font-size: 1.5rem;
    color: var(--color-text);
    transition: color 0.2s;

    &:hover {
      color: var(--color-primary);
    }
  }
`;
