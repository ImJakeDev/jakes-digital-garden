import { getAllPosts, PostMeta } from '@/utils/getAllPosts';
import Card from '@/components/Card';

export default function Home() {
  const posts: PostMeta[] = getAllPosts();

  return (
    <div>
      <div>{posts.length > 0 ? posts.map((post) => <Card key={post.slug} title={post.title} description={post.description} tags={post.tags} slug={post.slug} />) : <p>No blog posts found.</p>}</div>
    </div>
  );
}
