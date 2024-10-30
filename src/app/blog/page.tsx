import Link from 'next/link';
import { getAllPosts, PostMeta } from '@/utils/getAllPosts';

export default function BlogPage() {
  const posts: PostMeta[] = getAllPosts(); // Fetch all posts

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Explore Blogs</h1>
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.slug} className="border-b pb-4">
              <Link
                href={`/blog/${post.slug}`}
                className="text-2xl font-bold text-gray-900 dark:text-white hover:underline"
              >
                {post.title}
              </Link>
              <p className="dark:text-white text-black mt-2">
                {post.description}
              </p>

              <div className="flex space-x-2 mt-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No blog posts found.</p>
        )}
      </div>
    </div>
  );
}
