import Container from "@/components/site/Container";
import PageWrapper from "@/components/site/PageWrapper";
import WritingCard from "@/components/writings/WritingCard";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;

  const formattedTitle = slug

    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const publishedAt = new Date("2026-05-13");
  const formattedDate = publishedAt.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const content = `
Most people are not actually reacting to reality.
They are reacting to stories they have repeated to themselves for years.

The strange thing about life is that patterns become invisible once they become familiar.
People stop questioning things they see every day.

That is why writing matters.

Good writing interrupts automatic thinking.
It forces people to pause long enough to notice what was always sitting in front of them.

Maybe that is all clarity really is:
prolonged attention.
`;
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const relatedWritings = [
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

  return (
    <PageWrapper>
      <Container className="max-w-2xl">
        <article>
          <div className="border-b border-gray-200 pb-10">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
              Writing
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
              {formattedTitle}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span>D•sonofSolomon</span>

              <span>•</span>

              <span>{formattedDate}</span>

              <span>•</span>

              <span>{readingTime} min read</span>
            </div>
          </div>

          <div className="mt-10 space-y- text-[1.05rem] leading-8 text-gray-700 md:text-lg md:leading-9">
            {content
              .trim()
              .split("\n\n")
              .map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
          </div>
        </article>

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
        excerpt={writing.excerpt}
        slug={writing.slug}
        category={writing.category}
      />
    ))}
  </div>
</section>
      </Container>
    </PageWrapper>
  );
}
