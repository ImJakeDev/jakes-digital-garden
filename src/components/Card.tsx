import Link from 'next/link';

type CardProps = {
  title: string;
  description: string;
  tags: string[];
  slug: string;
};

export default function Card({ title, description, tags, slug }: CardProps) {
  return (
    <div>
      <Link href={`/blog/${slug}`}>{title}</Link>
      <p>{description}</p>
      <div>
        {tags.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
    </div>
  );
}
