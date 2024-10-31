import HomePage from '@/app/pages/Home';
import { getAllPosts, PostMeta } from '@/utils/getAllPosts';
import Card from '@/components/Card';

export default function Home() {
  const posts: PostMeta[] = getAllPosts();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <HomePage />

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card
              key={post.slug}
              title={post.title}
              description={post.description}
              tags={post.tags}
              slug={post.slug}
              image={post.img}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No blog posts found.</p>
        )}
      </div>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <span className="text-sm text-gray-500">Made with ✨ by Jake</span>
        <span className="text-sm text-gray-500">•</span>
        <em className="text-sm text-gray-500">© 2024 Jake Unplugged</em>
      </footer>
    </div>
  );
}
