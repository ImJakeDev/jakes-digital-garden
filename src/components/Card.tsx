type CardProps = {
  title: string;
  description: string;
  tags: string[];
};

export default function Card({ title, description, tags }: CardProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div>
        {tags.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
    </div>
  );
}
