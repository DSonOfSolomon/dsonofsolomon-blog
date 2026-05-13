import Container from "@/components/site/Container";
import PageWrapper from "@/components/site/PageWrapper";
import LoadingState from "@/components/site/LoadingState";

export default function WritingsLoading() {
  return (
    <PageWrapper>
      <Container>
        <LoadingState message="Loading writings..." />
      </Container>
    </PageWrapper>
  );
}