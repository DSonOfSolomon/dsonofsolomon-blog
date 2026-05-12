import Container from "@/components/site/Container";
import PageWrapper from "@/components/site/PageWrapper";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;

  return (
    <PageWrapper>
      <Container>
        <h1 className="text-3xl font-bold tracking-tight">
          {slug}
        </h1>

        <p className="mt-4 leading-8 text-gray-700">
          Individual writing page.
        </p>
      </Container>
    </PageWrapper>
  );
}