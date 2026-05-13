import type { Metadata } from "next";
import Container from "@/components/site/Container";
import PageWrapper from "@/components/site/PageWrapper";
import WritingCard from "@/components/writings/WritingCard";
import EmptyState from "@/components/site/EmptyState";

export const metadata: Metadata = {
  title: "Writings",
};

const writings: {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
}[] = [];

export default function WritingsPage() {
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
            <div className="grid gap-6 md:grid-cols-2">
              {writings.map((writing) => (
                <WritingCard
                  key={writing.slug}
                  title={writing.title}
                  excerpt={writing.excerpt}
                  slug={writing.slug}
                  category={writing.category}
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
