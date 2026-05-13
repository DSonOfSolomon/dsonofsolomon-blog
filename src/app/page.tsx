import Container from "@/components/site/Container";
import PageWrapper from "@/components/site/PageWrapper";
import Link from "next/link";

export default function HomePage() {
  return (
    <PageWrapper>
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
      href="/writings"
      className="inline-flex justify-center rounded-full bg-[#0a192f] px-6 py-3 text-sm font-medium !text-white no-underline transition-colors hover:bg-[#13294b]"
    >
      Read writings
    </Link>

    <Link
      href="/subscribe"
      className="inline-flex justify-center rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:border-gray-900"
    >
      Subscribe
    </Link>
  </div>
</section>
      </Container>
    </PageWrapper>
  );
}