import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    params: { slug: filename.replace('.mdx', '') },
  }));
}

// Change BlogPost to return a Promise
export default async function BlogPost({
  params,
}: PageProps): Promise<JSX.Element> {
  const { slug } = params;
  const postFilePath = path.join(process.cwd(), 'content', `${slug}.mdx`);

  // Check if the file exists
  if (!fs.existsSync(postFilePath)) {
    return <div>Post not found</div>;
  }

  // Read the content
  const postContent = fs.readFileSync(postFilePath, 'utf-8');
  const { data, content } = matter(postContent);

  // Render MDX content
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">{data.title}</h1>
      <div className="prose prose-lg dark:prose-dark mx-auto">
        <MDXRemote source={content} />
      </div>
    </div>
  );
}
