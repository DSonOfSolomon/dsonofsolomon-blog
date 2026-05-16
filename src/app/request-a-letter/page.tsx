import type { Metadata } from "next";
import Container from "@/components/site/Container";
import PageWrapper from "@/components/site/PageWrapper";
import PremiumGate from "@/components/premium/PremiumGate";
import { isPremiumSubscriber } from "@/lib/premium";

export const metadata: Metadata = {
  title: "Request a Letter",
};

export default async function RequestALetterPage() {
  const premium = await isPremiumSubscriber();

  if (!premium) {
    return (
      <PageWrapper>
        <Container>
          <PremiumGate
            title="Request a Personal Letter"
            description="Some things are easier written slowly. Personal letters are available to premium subscribers only."
            nextPath="/request-a-letter"
          />
        </Container>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Container>
        <section className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Premium Access
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
            Request a Personal Letter
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Some things are easier written slowly. Use this page to begin a
            more personal, intentional exchange.
          </p>
        </section>

        <section className="mt-10 max-w-3xl rounded-[2rem] border border-gray-200 bg-white p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-gray-950">
                Letter tiers
              </h2>
              <div className="mt-5 space-y-5 text-sm leading-7 text-gray-600">
                <div>
                  <p className="font-medium text-gray-950">Typed letter</p>
                  <p>
                    A reflective response, carefully written and delivered in a
                    clean digital format.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-950">Handwritten letter</p>
                  <p>
                    A slower, more tactile version intended for more intimate
                    or ceremonial requests.
                  </p>
                </div>
              </div>
            </div>

            <form className="space-y-4">
              <input
                placeholder="Your name"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-[#0a192f]"
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-[#0a192f]"
              />
              <select className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition-colors focus:border-[#0a192f]">
                <option>Typed letter</option>
                <option>Handwritten letter</option>
              </select>
              <textarea
                rows={8}
                placeholder="What would you like the letter to be about?"
                className="w-full rounded-3xl border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-[#0a192f]"
              />
              <button
                type="button"
                className="inline-flex rounded-full bg-[#0a192f] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#13294b]"
              >
                Request flow coming next
              </button>
            </form>
          </div>
        </section>
      </Container>
    </PageWrapper>
  );
}
