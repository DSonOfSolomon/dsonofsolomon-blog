import Container from "@/components/site/Container";

export default function HomePage() {
  return (
    <main className="min-h-screen py-16 md:py-24">
      <Container>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          Personal Writing System
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-6xl">
          D•sonofSolomon
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl md:leading-9">
        Perspective, ideas, thoughts, observations, and systems.
        </p>
      </Container>
    </main>
  );
}
