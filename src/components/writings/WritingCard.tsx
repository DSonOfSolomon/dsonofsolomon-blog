import Link from "next/link";
import CategoryBadge from "@/components/writings/CategoryBadge";

type WritingCardProps = {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  chapterLabel?: string;
};

export default function WritingCard({
  title,
  excerpt,
  slug,
  category,
  chapterLabel
}: WritingCardProps) {
  return (
    <Link
      href={`/writings/${slug}`}
      className="block rounded-2xl border border-gray-200 p-6 transition-colors hover:border-gray-400"
    >
      <article>
        <CategoryBadge label={category} />

        {chapterLabel && (
          <p className="mt-4 text-xs uppercase tracking-[0.22em] text-gray-500">
            {chapterLabel}
          </p>
        )}

        <h3 className="mt-4 text-xl font-semibold tracking-tight text-gray-950">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-gray-600">
          {excerpt}
          <span className="text-gray-400">...more</span>
        </p>

        <p className="mt-5 inline-flex text-sm font-medium text-[#0a192f] transition-colors hover:text-[#13294b]">
          Continue reading
        </p>
      </article>
    </Link>
  );
}
