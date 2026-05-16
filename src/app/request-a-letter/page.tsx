import type { Metadata } from "next";
import { createLetterRequest } from "@/app/admin/actions";
import Container from "@/components/site/Container";
import PageWrapper from "@/components/site/PageWrapper";
import PremiumGate from "@/components/premium/PremiumGate";
import { siteFeatures } from "@/lib/features";
import { isPremiumSubscriber } from "@/lib/premium";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Request a Letter",
};

export default async function RequestALetterPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  if (!siteFeatures.letterRequestsEnabled) {
    notFound();
  }

  const { success } = await searchParams;
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

  const tiers = [
    {
      value: "typed",
      title: "Typed letter",
      body: "A reflective response, carefully written and delivered in a clean digital format.",
    },
    {
      value: "handwritten",
      title: "Handwritten letter",
      body: "A slower, more tactile version intended for more intimate or ceremonial requests.",
    },
  ];

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
                {tiers.map((tier) => (
                  <div key={tier.value}>
                    <p className="font-medium text-gray-950">{tier.title}</p>
                    <p>{tier.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <form action={createLetterRequest} className="space-y-4">
              <input
                name="name"
                required
                placeholder="Your name"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-[#0a192f]"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Your email"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-[#0a192f]"
              />
              <select
                name="tier"
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition-colors focus:border-[#0a192f]"
              >
                {tiers.map((tier) => (
                  <option key={tier.value} value={tier.value}>
                    {tier.title}
                  </option>
                ))}
              </select>
              <textarea
                name="message"
                required
                rows={8}
                placeholder="What would you like the letter to be about?"
                className="w-full rounded-3xl border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-[#0a192f]"
              />
              <button
                type="submit"
                className="inline-flex rounded-full bg-[#0a192f] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#13294b]"
              >
                Submit request
              </button>

              {success === "1" && (
                <p className="text-sm text-green-700">Letter request submitted.</p>
              )}
            </form>
          </div>
        </section>
      </Container>
    </PageWrapper>
  );
}
