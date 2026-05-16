import Container from "@/components/site/Container";
import PageWrapper from "@/components/site/PageWrapper";
import { subscribeToLetters } from "@/app/admin/actions";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe",
};

export default async function SubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const { success } = await searchParams;

  return (
    <PageWrapper>
      <Container>
        <h1 className="text-3xl font-bold tracking-tight">
          Subscribe
        </h1>

        <p className="mt-4 max-w-2xl leading-8 text-gray-700">
          Join the subscriber list for future updates, letters, and new writing
          announcements.
        </p>

        <form
          action={subscribeToLetters}
          className="mt-8 max-w-2xl space-y-4 rounded-3xl border border-gray-200 bg-white p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="name"
              placeholder="Your name"
              className="rounded-2xl border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-[#0a192f]"
            />
            <input
              name="email"
              type="email"
              placeholder="Your email"
              required
              className="rounded-2xl border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-[#0a192f]"
            />
          </div>

          <button
            type="submit"
            className="inline-flex rounded-full bg-[#0a192f] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#13294b]"
          >
            Subscribe
          </button>

          {success === "1" && (
            <p className="text-sm text-green-700">
              Subscription saved.
            </p>
          )}
        </form>
      </Container>
    </PageWrapper>
  );
}
