import type { Metadata } from "next";
import Container from "@/components/site/Container";
import FollowButton from "@/components/follow/FollowButton";
import PageWrapper from "@/components/site/PageWrapper";
import { siteFeatures } from "@/lib/features";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Follow",
};

export default async function FollowPage() {
  if (!siteFeatures.followEnabled) {
    notFound();
  }

  return (
    <PageWrapper>
      <Container>
        <section className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Follow
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
            Follow the writings
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Allow notifications so each new public chapter can bring readers
            straight back into the universe.
          </p>

          <div className="mt-8">
            <FollowButton className="inline-flex h-[2.75rem] min-w-[8rem] items-center justify-center rounded-full bg-[#0a192f] px-6 text-sm font-medium !text-white transition-colors hover:bg-[#13294b]">
              Follow
            </FollowButton>
          </div>
        </section>
      </Container>
    </PageWrapper>
  );
}
