import Link from "next/link";

type WritingCardProps = {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
};

export default function WritingCard({
  title,
  excerpt,
  slug,
  category,
}: WritingCardProps) {
  return (
    <article className="rounded-2xl border border-gray-200 p-6 transition-colors hover:border-gray-400">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
        {category}
      </p>

      <h3 className="mt-4 text-xl font-semibold tracking-tight text-gray-950">
        <Link href={`/writings/${slug}`}>
          {title}
        </Link>
      </h3>

      <p className="mt-3 text-sm leading-7 text-gray-600">
        {excerpt}
        <span className="text-gray-400">...more</span>
      </p>

      <Link
        href={`/writings/${slug}`}
        className="mt-5 inline-flex text-sm font-medium text-[#0a192f] transition-colors hover:text-[#13294b]"
      >
        Continue reading
      </Link>
    </article>
  );
}