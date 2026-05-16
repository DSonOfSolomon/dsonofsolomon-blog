import Container from "@/components/site/Container";
import SiteFooter from "@/components/site/SiteFooter";
import PageWrapper from "@/components/site/PageWrapper";
import WritingCard from "@/components/writings/WritingCard";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getPostPreview } from "@/lib/writings";

export default async function HomePage() {
  const featuredWritings = await prisma.post.findMany({
    where: {
      status: "published",
      universe: "public",
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
      <>
        <Container>
          <section className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
              Personal Writing System
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-6xl">
              D•sonofSolomon
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl md:leading-9">
              Love, life, laughter and systems.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/unfiltered"
                className="inline-flex justify-center rounded-full bg-[#0a192f] px-6 py-3 text-sm font-medium !text-white no-underline transition-colors hover:bg-[#13294b]"
              >
                D•sonofSolomon Unfiltered
              </Link>

              <Link
                href="/request-a-letter"
                className="inline-flex justify-center rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:border-gray-900"
              >
                Request a letter
              </Link>
            </div>
          </section>

          <section className="mt-20 border-t border-gray-200 pt-12">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
                  Featured
                </p>

                <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-950 md:text-3xl">
                  Latest writings
                </h2>
              </div>

              <Link
                href="/writings"
                className="text-sm font-medium text-[#0a192f] transition-colors hover:text-[#13294b]"
              >
                View all writings
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {featuredWritings.map((writing) => (
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
        </Container>
        <SiteFooter />
      </>
    </PageWrapper>
  );
}
