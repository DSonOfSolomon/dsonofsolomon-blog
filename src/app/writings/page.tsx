import type { Metadata } from "next";
import Container from "@/components/site/Container";
import PageWrapper from "@/components/site/PageWrapper";
import WritingCard from "@/components/writings/WritingCard";

export const metadata: Metadata = {
  title: "Writings",
};

const writings = [
  {
    title: "The Art of Seeing Clearly",
    excerpt:
      "Notes on attention, culture, and learning to notice what most people rush past.",
    slug: "the-art-of-seeing-clearly",
    category: "Life",
  },
  {
    title: "Systems Before Motivation",
    excerpt:
      "Why repeatable systems beat emotional bursts when building anything meaningful.",
    slug: "systems-before-motivation",
    category: "Systems",
  },
  {
    title: "The Things We Laugh About",
    excerpt:
      "A reflection on humour, survival, and the stories people hide inside ordinary jokes.",
    slug: "the-things-we-laugh-about",
    category: "Laughter",
  },
];

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
            A growing collection of thoughts on love, life, laughter and systems.
          </p>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          {writings.map((writing) => (
            <WritingCard
              key={writing.slug}
              title={writing.title}
              excerpt={writing.excerpt}
              slug={writing.slug}
              category={writing.category}
            />
          ))}
        </section>
      </Container>
    </PageWrapper>
  );
}