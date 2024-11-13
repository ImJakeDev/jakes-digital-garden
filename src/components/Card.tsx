import Image from 'next/image';
import Link from 'next/link';

type CardProps = {
  title: string;
  description: string;
  tags: string[];
  slug: string;
  image: string;
};

export default function Card({
  title,
  description,
  tags,
  slug,
  image,
}: CardProps) {
  return (
    <div>
      <div>
        <Image src={image} alt={title} width={100} height={100} />
      </div>
      <div>
        <Link href={`/blog/${slug}`}>{title}</Link>
        <p>{description}</p>
        <div>
          {tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
