import { createSubscriber, deleteSubscriber } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

export default async function AdminSubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
          Subscribers
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-950">
          Add subscriber
        </h2>

        <form action={createSubscriber} className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <input
            name="email"
            type="email"
            placeholder="email@example.com"
            required
            className="rounded-2xl border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-[#0a192f]"
          />
          <input
            name="name"
            placeholder="Optional name"
            className="rounded-2xl border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-[#0a192f]"
          />
          <button
            type="submit"
            className="rounded-full bg-[#0a192f] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#13294b]"
          >
            Save
          </button>
        </form>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-950">
          Subscriber list
        </h2>

        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id}>
                  <td className="px-4 py-4 font-medium text-gray-950">{subscriber.email}</td>
                  <td className="px-4 py-4">{subscriber.name ?? "—"}</td>
                  <td className="px-4 py-4">
                    {subscriber.createdAt.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-4">
                    <form action={deleteSubscriber}>
                      <input type="hidden" name="id" value={subscriber.id} />
                      <button type="submit" className="text-red-600 hover:text-red-700">
                        Delete
                      </button>
                    </form>
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
