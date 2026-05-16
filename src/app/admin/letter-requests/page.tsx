import {
  deleteLetterRequest,
  updateLetterRequestStatus,
} from "@/app/admin/actions";
import BackToDashboardLink from "@/components/admin/BackToDashboardLink";
import { prisma } from "@/lib/prisma";

export default async function AdminLetterRequestsPage() {
  const requests = await prisma.letterRequest.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <BackToDashboardLink />
      </div>

      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
            Letter Requests
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-950">
            Personal letter queue
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">
            Premium members can request typed or handwritten letters. Use this
            queue to review, track, and close requests.
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr className="text-left text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
                <th className="px-3 py-3">Requester</th>
                <th className="px-3 py-3">Tier</th>
                <th className="px-3 py-3">Message</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Submitted</th>
                <th className="px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-3 py-4 align-top">
                    <p className="font-medium text-gray-950">{request.name}</p>
                    <p className="text-gray-500">{request.email}</p>
                  </td>
                  <td className="px-3 py-4 align-top capitalize">{request.tier}</td>
                  <td className="max-w-md px-3 py-4 align-top text-gray-600">
                    {request.message}
                  </td>
                  <td className="px-3 py-4 align-top capitalize">{request.status}</td>
                  <td className="px-3 py-4 align-top">
                    {request.createdAt.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-3 py-4 align-top">
                    <div className="flex flex-wrap gap-3">
                      <form action={updateLetterRequestStatus}>
                        <input type="hidden" name="id" value={request.id} />
                        <input type="hidden" name="status" value="in_progress" />
                        <button type="submit" className="text-[#0a192f] hover:text-[#13294b]">
                          Start
                        </button>
                      </form>

                      <form action={updateLetterRequestStatus}>
                        <input type="hidden" name="id" value={request.id} />
                        <input type="hidden" name="status" value="completed" />
                        <button type="submit" className="text-gray-600 hover:text-gray-950">
                          Complete
                        </button>
                      </form>

                      <form action={deleteLetterRequest}>
                        <input type="hidden" name="id" value={request.id} />
                        <button type="submit" className="text-red-600 hover:text-red-700">
                          Delete
                        </button>
                      </form>
                    </div>
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
