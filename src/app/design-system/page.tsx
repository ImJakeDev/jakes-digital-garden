import Colors from '@/components/design-system/Colors';
import PageContainer from '@/components/layouts/PageContainer';
import { css } from '@linaria/core';

export default function DesignSystemPage() {
  return (
    <PageContainer>
      <h2>Design System Page</h2>
      <article className={justStretch}>
        <Colors />
      </article>
    </PageContainer>
  );
}

const justStretch = css`
  display: grid;
  min-width: 100%;
`;
