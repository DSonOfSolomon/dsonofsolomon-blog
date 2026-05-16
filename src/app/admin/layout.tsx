import Container from "@/components/site/Container";
import PageWrapper from "@/components/site/PageWrapper";
import Link from "next/link";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageWrapper>
      <Container>
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Content Adminitration
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
            Dashboard
          </h1>
          <div className="mt-5">
            <Link
              href="/admin/posts/new"
              className="inline-flex rounded-full bg-[#0a192f] px-5 py-2.5 text-sm font-medium !text-white transition-colors hover:bg-[#13294b]"
            >
            ＋Create post
            </Link>
          </div>
        </div>
        <main>{children}</main>
      </Container>
    </PageWrapper>
  );
}
