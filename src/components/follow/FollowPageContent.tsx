import { followWriter } from "@/app/admin/actions";

export default function FollowPageContent({
  success,
  currentSubscriber,
  compact = false,
}: {
  success?: string;
  currentSubscriber?: {
    name: string | null;
    email: string;
  } | null;
  compact?: boolean;
}) {
  const headingClass = compact
    ? "mt-3 text-2xl font-bold tracking-tight text-gray-950 md:text-3xl"
    : "mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl";

  return (
    <>
      <section className={compact ? "max-w-2xl" : "max-w-3xl"}>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          Follow
        </p>

        <h1 className={headingClass}>
          Follow the writings
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
          Join the reader list for new writing announcements and first access
          when new layers open up.
        </p>
      </section>

      <section className="mt-8 grid max-w-4xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-gray-200 bg-[#f7f5ef] p-6">
          <h2 className="text-xl font-semibold tracking-tight text-gray-950">
            What followers get
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
            <p>New writing announcements as they are published.</p>
            <p>Early notice when the next layer of the writing universe opens.</p>
            <p>A direct way to stay with the work as the archive grows.</p>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6">
          {currentSubscriber ? (
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
                Already following
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-950">
                You're on the list
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-600">
                {currentSubscriber.name
                  ? `${currentSubscriber.name}, new writings will be sent to ${currentSubscriber.email}.`
                  : `New writings will be sent to ${currentSubscriber.email}.`}
              </p>

              {success === "1" && (
                <p className="mt-4 text-sm text-green-700">
                  Follow confirmed.
                </p>
              )}
            </div>
          ) : (
            <form action={followWriter} className="space-y-4">
              <div className="grid gap-4">
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
                Follow
              </button>

              {success === "1" && (
                <p className="text-sm text-green-700">
                  You're on the list.
                </p>
              )}
            </form>
          )}
        </div>
      </section>
    </>
  );
}
