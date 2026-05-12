import Container from "@/components/site/Container";

export default function AboutPage() {
  return (
    <main className="min-h-screen py-12">
      <Container>
        <h1 className="text-3xl font-bold tracking-tight">
          About
        </h1>

        <p className="mt-4 leading-8 text-gray-700">
          Welcome to my writing system.
        </p>
      </Container>
    </main>
  );
}