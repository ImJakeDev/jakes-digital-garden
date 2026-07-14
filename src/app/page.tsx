import { getAllPosts } from '@/utils/getAllPosts';
import { getAllArticles } from '@/utils/getAllArticles';
import Card from '@/components/Card';
import PageContainer from '@/components/layouts/PageContainer';
import { css } from '@linaria/core';
import Link from 'next/link';
import BookList from '@/components/BookList';
import PostItNote from '@/components/Post-itNote';
import WeatherStation from '@/components/WeatherStation';
import { Suspense } from 'react';
import LoadingIndicator from '@/components/LoadingIndicator';

export default async function Home() {
  const [posts, articles] = await Promise.all([getAllPosts(), getAllArticles()]);

  return (
    <PageContainer>
      <div className={fluidRow}>
        <div>
          <p>Welcome to my Digital Garden. 🌱</p>
          <br />
          <p>A place where I plant and nurture digital seeds that will grow into ideas that create, connect and inspire projects, creativity, and anarchy. 😈 🤭 😜</p>
        </div>
        <WeatherStation />
      </div>
      {/* // Todo: Build The Digital Garden Section */}
      <div className={GardenFenceStyles}>
        <div className={SectionStyles}>
          <h2>Articles:</h2>
          <ul className={BlogPostsStyles}>
            {articles.length ? (
              articles.map((article) => (
                <li key={article.slug}>
                  <Link href={`/articles/${article.slug}`}>
                    <Card title={article.title} description={article.description} />
                  </Link>
                </li>
              ))
            ) : (
              <li>
                <p>No articles found.</p>
              </li>
            )}
          </ul>
        </div>
        <div className={SectionStyles}>
          <h2>Blog Post-its:</h2>
          <ul className={BlogPostsStyles}>
            {posts.length ? (
              posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>
                    <PostItNote title={post.title} description={post.description} />
                  </Link>
                </li>
              ))
            ) : (
              <li>
                <p>No blog posts found.</p>
              </li>
            )}
          </ul>
        </div>
        <div className={SectionStyles}>
          <h2>The Library:</h2>
          <Suspense fallback={<LoadingIndicator />}>
            <BookList />
          </Suspense>
        </div>
      </div>
    </PageContainer>
  );
}

// Todo: Update the styles for the Home page layout!

const BlogPostsStyles = css`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-flow: row wrap;
  gap: var(--space-m-l);
  list-style: none;
  padding: 0;

  li {
    padding: 0;
  }
`;

const SectionStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--space-m-l);
`;

const GardenFenceStyles = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-flow: column wrap;
  gap: var(--space-m-l);
`;

const fluidRow = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-flow: row wrap;
  gap: var(--space-m-l);
`;
