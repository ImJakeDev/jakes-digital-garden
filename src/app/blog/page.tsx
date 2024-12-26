import Link from 'next/link';
import { getAllPosts, PostMeta } from '@/utils/getAllPosts';
import PageContainer from '@/components/layouts/PageContainer';
import { css } from '@linaria/core';
import Card from '@/components/Card';

export default function BlogPage() {
  const posts: PostMeta[] = getAllPosts(); // Fetch all posts

  return (
    <PageContainer>
      <h2>Explore My blog Posts:</h2>
      <ul className={BlogPostsStyles}>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <Link key={index} href={`/blog/${post.slug}`}>
              <li>
                <Card title={post.title} description={post.description} tags={post.tags} />
              </li>
            </Link>
          ))
        ) : (
          <li>
            <p>No blog posts found.</p>
          </li>
        )}
      </ul>
    </PageContainer>
  );
}

const BlogPostsStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--space-m-l);
`;
