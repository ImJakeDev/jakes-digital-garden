import { css } from '@linaria/core';

export const globals = css`
  :global() {
    :root {
      --background: #ffffff;
      --foreground: #171717;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --background: #0a0a0a;
        --foreground: #ededed;
      }
    }

    html {
      font-family: var(--manrope);
    }

    h1 {
      font-family: var(--stix-two-text);
    }

    code {
      font-family: var(--fira-code);
    }

    body {
      color: var(--foreground);
      background: var(--background);
    }
  }
`;
