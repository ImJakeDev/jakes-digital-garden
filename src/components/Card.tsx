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
    <div className="bg-white dark:bg-gray-800 w-full rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
      {/* Image */}
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      {/* Card content */}
      <div className="p-6">
        {/* Title */}
        <Link
          href={`/blog/${slug}`}
          className="text-2xl font-bold text-gray-900 dark:text-white hover:underline"
        >
          {title}
        </Link>

        {/* Description */}
        <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>

        {/* Tags */}
        <div className="mt-4 space-x-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-blue-100 text-blue-600 px-3 py-1 text-sm font-semibold rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
