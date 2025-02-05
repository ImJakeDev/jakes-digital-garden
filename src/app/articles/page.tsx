import Link from 'next/link';
import { getAllArticles } from '@/utils/getAllArticles';
import PageContainer from '@/components/layouts/PageContainer';
import { css } from '@linaria/core';
import Card from '@/components/Card';

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <PageContainer>
      <h2>Explore articles:</h2>
      <ul className={ArticlesStyles}>
        {!!articles.length ? (
          articles.map((article, index) => {
            return (
              <Link key={index} href={`/articles/${article.slug}`}>
                <li>
                  <Card title={article.title} description={article.description} />
                </li>
              </Link>
            );
          })
        ) : (
          <li>
            <p>No articles found.</p>
          </li>
        )}
      </ul>
    </PageContainer>
  );
}

const ArticlesStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--space-m-l);
`;
