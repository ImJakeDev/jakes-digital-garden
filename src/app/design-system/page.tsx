import LoadingIndicator from '@/components/LoadingIndicator';
import Colors from '@/components/design-system/Colors';
import PageContainer from '@/components/layouts/PageContainer';
import { css } from '@linaria/core';

export default function DesignSystemPage() {
  return (
    <PageContainer>
      <h2>Design System Page</h2>

      <section style={{ display: 'grid' }}>
        <h3>Loading Indicators:</h3>
        <LoadingIndicator />
        <LoadingIndicator text="something" />
      </section>

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
