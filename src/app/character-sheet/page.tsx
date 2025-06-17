'use server';

import PageContainer from '@/components/layouts/PageContainer';
import Profile from '@/components/Profile';

export default async function CharacterSheetPage() {
  return (
    <PageContainer>
      <Profile />
    </PageContainer>
  );
}
