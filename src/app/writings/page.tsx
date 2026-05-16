import type { Metadata } from "next";
import Container from "@/components/site/Container";
import PageWrapper from "@/components/site/PageWrapper";
import WritingCard from "@/components/writings/WritingCard";
import EmptyState from "@/components/site/EmptyState";
import { prisma } from "@/lib/prisma";
import { getPostPreview } from "@/lib/writings";

export const metadata: Metadata = {
  title: "Writings",
};

export default async function WritingsPage() {
  const writings = await prisma.post.findMany({
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
  });

  return (
    <PageWrapper>
      <Container>
        <section>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Archive
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
            Writings
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            A growing collection of thoughts on love, life, laughter and
            systems.
          </p>
        </section>

        <section className="mt-12">
          {writings.length > 0 ? (
            <div className="space-y-6">
              {writings.map((writing) => (
                <WritingCard
                  key={writing.slug}
                  title={writing.title}
                  excerpt={getPostPreview(writing.excerpt, writing.content)}
                  slug={writing.slug}
                  category={writing.category?.name ?? "Writings"}
                  chapterLabel={writing.chapterLabel ?? undefined}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No writings yet"
              message="New writings will appear here once they are published."
            />
          )}
        </section>
      </Container>
    </PageWrapper>
  );
}
