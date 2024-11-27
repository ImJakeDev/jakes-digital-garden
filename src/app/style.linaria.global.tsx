import { css } from '@linaria/core';

export const globals = css`
  :global() {
    :root {
      /* Colors */
      --background: #fff;
      --foreground: #171717;
      --color-border: #e1e1e1;

      /* Min Viewport Width -> 320px */
      /* Max Viewport Width -> 1240px */

      /* Spacing */
      /* Space 3xs: 5px → 5px */
      --space-3xs: clamp(0.3125rem, 0.3125rem + 0vw, 0.3125rem);
      /* Space 2xs: 9px → 10px */
      --space-2xs: clamp(0.5625rem, 0.5408rem + 0.1087vw, 0.625rem);
      /* Space xs: 14px → 15px */
      --space-xs: clamp(0.875rem, 0.8533rem + 0.1087vw, 0.9375rem);
      /* Space s: 18px → 20px */
      --space-s: clamp(1.125rem, 1.0815rem + 0.2174vw, 1.25rem);
      /* Space m: 27px → 30px */
      --space-m: clamp(1.6875rem, 1.6223rem + 0.3261vw, 1.875rem);
      /* Space l: 36px → 40px */
      --space-l: clamp(2.25rem, 2.163rem + 0.4348vw, 2.5rem);
      /* Space xl: 54px → 60px */
      --space-xl: clamp(3.375rem, 3.2446rem + 0.6522vw, 3.75rem);
      /* Space 2xl: 72px → 80px */
      --space-2xl: clamp(4.5rem, 4.3261rem + 0.8696vw, 5rem);
      /* Space 3xl: 108px → 120px */
      --space-3xl: clamp(6.75rem, 6.4891rem + 1.3043vw, 7.5rem);

      /* One-up pairs */
      /* Space 3xs-2xs: 5px → 10px */
      --space-3xs-2xs: clamp(0.3125rem, 0.2038rem + 0.5435vw, 0.625rem);
      /* Space 2xs-xs: 9px → 15px */
      --space-2xs-xs: clamp(0.5625rem, 0.4321rem + 0.6522vw, 0.9375rem);
      /* Space xs-s: 14px → 20px */
      --space-xs-s: clamp(0.875rem, 0.7446rem + 0.6522vw, 1.25rem);
      /* Space s-m: 18px → 30px */
      --space-s-m: clamp(1.125rem, 0.8641rem + 1.3043vw, 1.875rem);
      /* Space m-l: 27px → 40px */
      --space-m-l: clamp(1.6875rem, 1.4049rem + 1.413vw, 2.5rem);
      /* Space l-xl: 36px → 60px */
      --space-l-xl: clamp(2.25rem, 1.7283rem + 2.6087vw, 3.75rem);
      /* Space xl-2xl: 54px → 80px */
      --space-xl-2xl: clamp(3.375rem, 2.8098rem + 2.8261vw, 5rem);
      /* Space 2xl-3xl: 72px → 120px */
      --space-2xl-3xl: clamp(4.5rem, 3.4565rem + 5.2174vw, 7.5rem);

      /* Custom pairs */
      /* Space s-l: 18px → 40px */
      --space-s-l: clamp(1.125rem, 0.6467rem + 2.3913vw, 2.5rem);

      /* Spacing is made with and from https://utopia.fyi/space/calculator/ */

      /* Font Sizes */
      /* Step -2: 12.5px → 12.8px */
      --step-neg-2: clamp(0.7813rem, 0.7747rem + 0.0326vw, 0.8rem);
      /* Step -1: 15px → 16px */
      --step-neg-1: clamp(0.9375rem, 0.9158rem + 0.1087vw, 1rem);
      /* Step 0: 18px → 20px */
      --step-0: clamp(1.125rem, 1.0815rem + 0.2174vw, 1.25rem);
      /* Step 1: 21.6px → 25px */
      --step-1: clamp(1.35rem, 1.2761rem + 0.3696vw, 1.5625rem);
      /* Step 2: 25.92px → 31.25px */
      --step-2: clamp(1.62rem, 1.5041rem + 0.5793vw, 1.9531rem);
      /* Step 3: 31.104px → 39.0625px */
      --step-3: clamp(1.944rem, 1.771rem + 0.8651vw, 2.4414rem);
      /* Step 4: 37.3248px → 48.8281px */
      --step-4: clamp(2.3328rem, 2.0827rem + 1.2504vw, 3.0518rem);
      /* Step 5: 44.7898px → 61.0352px */
      --step-5: clamp(2.7994rem, 2.4462rem + 1.7658vw, 3.8147rem);

      /* Font Sizes are made with and from https://utopia.fyi/type/calculator */

      /* Grid Layout */
      --grid-max-width: 77.5rem;
      --grid-gutter: var(--space-s-l, clamp(1.125rem, 0.6467rem + 2.3913vw, 2.5rem));
      --grid-columns: 12;
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
