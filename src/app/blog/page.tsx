import Link from 'next/link';
import { getAllPosts, PostMeta } from '@/utils/getAllPosts';
import PageContainer from '@/components/layouts/PageContainer';

export default function BlogPage() {
  const posts: PostMeta[] = getAllPosts(); // Fetch all posts

  return (
    <PageContainer>
      <h2>Explore My blog Posts</h2>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.slug}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              <p>{post.description}</p>

              <div>
                {post.tags.map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No blog posts found.</p>
        )}
      </div>
    </PageContainer>
  );
}
