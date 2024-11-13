import Link from 'next/link';
import { getAllPosts, PostMeta } from '@/utils/getAllPosts';

export default function BlogPage() {
  const posts: PostMeta[] = getAllPosts(); // Fetch all posts

  return (
    <div>
      <h1>Explore Blogs</h1>
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
    </div>
  );
}
