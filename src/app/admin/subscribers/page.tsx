import BackToDashboardLink from "@/components/admin/BackToDashboardLink";
import { prisma } from "@/lib/prisma";

function AudienceCard({
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

export default async function AdminSubscribersPage() {
  const [followers, followerCount] = await Promise.all([
    prisma.follower.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.follower.count({ where: { status: "active" } }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <BackToDashboardLink />
      </div>

      <section className="grid gap-4 sm:grid-cols-1">
        <AudienceCard label="Followers" value={followerCount} note="Public readers on the list" />
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
          Followers
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-950">
          Notification audience
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">
          Each follower here is a device-level push subscription created when a
          reader allows notifications from the follow modal.
        </p>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-950">
          Follower list
        </h2>

        <div className="mt-6 -mx-2 overflow-x-auto px-2">
          <div className="min-w-[54rem] overflow-hidden rounded-2xl border border-gray-100">
          <table className="w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
                <th className="whitespace-nowrap px-4 py-3">Endpoint</th>
                <th className="whitespace-nowrap px-4 py-3">Status</th>
                <th className="whitespace-nowrap px-4 py-3">Browser</th>
                <th className="whitespace-nowrap px-4 py-3">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {followers.map((follower) => (
                <tr key={follower.id}>
                  <td className="px-4 py-4">
                    <div className="max-w-[18rem] truncate font-medium text-gray-950">
                      {follower.endpoint}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-gray-600">
                      {follower.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="max-w-[15rem] truncate">
                      {follower.userAgent ?? "Unknown"}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {follower.createdAt.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </section>
    </div>
  );
}
