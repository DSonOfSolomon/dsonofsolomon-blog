import { notFound } from "next/navigation";
import Container from "@/components/site/Container";
import PageWrapper from "@/components/site/PageWrapper";
import WritingCard from "@/components/writings/WritingCard";
import CategoryBadge from "@/components/writings/CategoryBadge";
import { siteFeatures } from "@/lib/features";
import { prisma } from "@/lib/prisma";
import { getPostPreview } from "@/lib/writings";
import Link from "next/link";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.post.findFirst({
    where: {
      slug,
      status: "published",
      universe: "public",
    },
    include: {
      category: true,
    },
  });

  if (!post) {
    notFound();
  }

  const formattedDate = (post.publishedAt ?? post.createdAt).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const wordCount = post.content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const relatedWritings = await prisma.post.findMany({
    where: {
      status: "published",
      universe: "public",
      slug: {
        not: post.slug,
      },
      ...(post.categoryId ? { categoryId: post.categoryId } : {}),
    },
    include: {
      category: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
    take: 2,
  });

  return (
    <PageWrapper>
      <Container className="max-w-2xl">
        <article>
          <div className="border-b border-gray-200 pb-10">
            <CategoryBadge label={post.category?.name ?? "Writing"} />

            {post.chapterLabel && (
              <p className="mt-4 text-xs uppercase tracking-[0.22em] text-gray-500">
                {post.chapterLabel}
              </p>
            )}

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span>D•sonofSolomon</span>
              <span>•</span>
              <span>{formattedDate}</span>
              <span>•</span>
              <span>{readingTime} min read</span>
            </div>
          </div>

          <div className="mt-10 space-y-8 text-[1.05rem] leading-8 text-gray-700 md:text-lg md:leading-9">
            {post.content
              .trim()
              .split("\n\n")
              .map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
          </div>
        </article>

        {relatedWritings.length > 0 && (
          <section className="mt-16 border-t border-gray-200 pt-10">
            <div className="mb-8">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
                Keep reading
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-950">
                Related writings
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {relatedWritings.map((writing) => (
                <WritingCard
                  key={writing.slug}
                  title={writing.title}
                  excerpt={getPostPreview(writing.excerpt, writing.content)}
                  slug={writing.slug}
                  category={writing.category?.name ?? "Writing"}
                  chapterLabel={writing.chapterLabel ?? undefined}
                />
              ))}
            </div>
          </section>
        )}

        {siteFeatures.followEnabled && (
          <section className="mt-16 border-t border-gray-200 pt-10">
            <div className="max-w-[31rem] rounded-[1.45rem] border border-gray-200 bg-[#f7f5ef] px-6 py-5">
              <p className="text-lg leading-8 text-gray-700">
                If this resonated with you,
                <br />
                follow to stay connected to future writings.
              </p>
              <Link
                href="/follow"
                className="mt-5 inline-flex rounded-full bg-[#0a192f] px-5 py-2.5 text-sm font-medium !text-white no-underline transition-colors hover:bg-[#13294b]"
              >
                Follow
              </Link>
            </div>
          </section>
        )}
      </Container>
    </PageWrapper>
  );
}
