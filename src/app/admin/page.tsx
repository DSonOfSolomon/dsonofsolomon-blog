import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ensureDefaultCategories } from "@/lib/admin";

function StatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: number;
  note: string;
}) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
        {label}
      </p>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-gray-950">
        {value}
      </p>
      <p className="mt-2 text-sm text-gray-600">{note}</p>
    </div>
  );
}

export default async function AdminDashboardPage() {
  await ensureDefaultCategories();

  const [postCount, publishedCount, draftCount, publicCount, unfilteredCount, categoryCount, followerCount, premiumCount, letterRequestCount, recentPosts] =
    await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { status: "published" } }),
      prisma.post.count({ where: { status: "draft" } }),
      prisma.post.count({ where: { status: "published", universe: "public" } }),
      prisma.post.count({ where: { status: "published", universe: "unfiltered" } }),
      prisma.category.count(),
      prisma.subscriber.count({ where: { tier: "free" } }),
      prisma.subscriber.count({ where: { tier: "premium" } }),
      prisma.letterRequest.count(),
      prisma.post.findMany({
        orderBy: { updatedAt: "desc" },
        take: 5,
        include: { category: true },
      }),
    ]);

  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Posts" value={postCount} note="Total writings in the system" />
        <StatCard label="Published" value={publishedCount} note="Published across both universes" />
        <StatCard label="Drafts" value={draftCount} note="Still in progress" />
        <StatCard label="Writings" value={publicCount} note="Published to the public universe" />
        <StatCard label="Unfiltered" value={unfilteredCount} note="Published to the premium universe" />
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Categories" value={categoryCount} note="Controlled writing taxonomy" />
        <StatCard label="Followers" value={followerCount} note="Public readers following the writings" />
        <StatCard label="Premium" value={premiumCount} note="Reserved for the later premium layer" />
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Letters" value={letterRequestCount} note="Dormant premium request queue" />
        <StatCard label="Audience" value={followerCount + premiumCount} note="Total stored email audience" />
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
              Recent Activity
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-950">
              Recently updated posts
            </h2>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Universe</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white text-sm text-gray-700">
              {recentPosts.map((post) => (
                <tr key={post.id}>
                  <td className="px-4 py-4 font-medium text-gray-950">{post.title}</td>
                  <td className="px-4 py-4 capitalize">{post.status}</td>
                  <td className="px-4 py-4 capitalize">{post.universe}</td>
                  <td className="px-4 py-4">{post.category?.name ?? "Unassigned"}</td>
                  <td className="px-4 py-4">
                    {post.updatedAt.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-[#0a192f] hover:text-[#13294b]"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
