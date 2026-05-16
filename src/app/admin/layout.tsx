import Container from "@/components/site/Container";
import PageWrapper from "@/components/site/PageWrapper";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageWrapper>
      <Container>
        <main>{children}</main>
      </Container>
    </PageWrapper>
  );
}
