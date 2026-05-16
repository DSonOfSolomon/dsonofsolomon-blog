import type { Metadata } from "next";
import Container from "@/components/site/Container";
import FollowPageContent from "@/components/follow/FollowPageContent";
import PageWrapper from "@/components/site/PageWrapper";
import { siteFeatures } from "@/lib/features";
import { getCurrentSubscriber } from "@/lib/premium";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Follow",
};

export default async function FollowPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  if (!siteFeatures.followEnabled) {
    notFound();
  }

  const { success } = await searchParams;
  const subscriber = await getCurrentSubscriber();

  return (
    <PageWrapper>
      <Container>
        <FollowPageContent success={success} currentSubscriber={subscriber} />
      </Container>
    </PageWrapper>
  );
}
