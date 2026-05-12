import Container from "@/components/site/Container";
import PageWrapper from "@/components/site/PageWrapper";

export default function WritingsPage() {
  return (
    <PageWrapper>
      <Container>
        <h1 className="text-3xl font-bold tracking-tight">
          Writings
        </h1>

        <p className="mt-4 leading-8 text-gray-700">
          All writing will appear here.
        </p>
      </Container>
    </PageWrapper>
  );
}