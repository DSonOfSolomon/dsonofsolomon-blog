import { notFound } from "next/navigation";
import Container from "@/components/site/Container";
import FollowButton from "@/components/follow/FollowButton";
import PageWrapper from "@/components/site/PageWrapper";
import WritingCard from "@/components/writings/WritingCard";
import CategoryBadge from "@/components/writings/CategoryBadge";
import { siteFeatures } from "@/lib/features";
import { prisma } from "@/lib/prisma";
import { getPostPreview } from "@/lib/writings";

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
  const paragraphs = post.content
    .replace(/\r\n/g, "\n")
    .trim()
    .split(/\n\s*\n+/)
    .map((paragraph) => paragraph.replace(/\n+/g, " ").trim())
    .filter(Boolean);

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
      <Container className="max-w-[44rem]">
        <article>
          {post.coverImage ? (
            <div
              className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-[#0a192f]"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(7,17,31,0.18) 0%, rgba(7,17,31,0.34) 42%, rgba(7,17,31,0.82) 100%), url("${post.coverImage}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="min-h-[22rem] p-8 md:min-h-[26rem] md:p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(247,245,239,0.12),transparent_28%)]" />
                <div className="relative flex min-h-[16rem] flex-col justify-end">
                  <CategoryBadge label={post.category?.name ?? "Writing"} />

                  {post.chapterLabel && (
                    <p className="mt-4 text-xs uppercase tracking-[0.22em] text-white/72">
                      {post.chapterLabel}
                    </p>
                  )}

                  <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-white md:text-5xl">
                    {post.title}
                  </h1>

                  <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/72">
                    <span>D•sonofSolomon</span>
                    <span>•</span>
                    <span>{formattedDate}</span>
                    <span>•</span>
                    <span>{readingTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
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
          )}

          <div className="mt-10">
            <div className="max-w-[43rem] space-y-7 text-[1.075rem] leading-[2.05rem] tracking-[-0.005em] text-gray-700 md:text-[1.18rem] md:leading-[2.22rem]">
              {paragraphs.map((paragraph, index) => (
                <p key={`${index}-${paragraph.slice(0, 24)}`}>
                  {paragraph}
                </p>
              ))}
            </div>
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
            <div className="max-w-[22rem] rounded-[1.2rem] border border-gray-200 bg-[#f7f5ef] px-4 py-3.5">
              <p className="text-base leading-7 text-gray-700">
                If this resonated with you, hit the follow 
                <br />
                button to stay updated on future writings.
              </p>
              <FollowButton
                className="mt-3 inline-flex rounded-full bg-[#0a192f] px-3.5 py-2 text-sm font-medium !text-white no-underline transition-colors hover:bg-[#13294b]"
              >
                Follow
              </FollowButton>
            </div>
          </section>
        )}
      </Container>
    </PageWrapper>
  );
}
