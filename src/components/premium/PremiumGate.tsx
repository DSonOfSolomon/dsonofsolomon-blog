import Link from "next/link";

type PremiumGateProps = {
  title: string;
  description: string;
  nextPath: string;
};

export default function PremiumGate({
  title,
  description,
  nextPath,
}: PremiumGateProps) {
  const premiumHref = `/subscribe?plan=premium&next=${encodeURIComponent(nextPath)}`;

  return (
    <section className="rounded-[2rem] border border-gray-200 bg-white p-8 md:p-10">
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-gray-500">
        Premium Access
      </p>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-950 md:text-5xl">
        {title}
      </h1>

      <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
        {description}
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href={premiumHref}
          className="inline-flex justify-center rounded-full bg-[#0a192f] px-6 py-3 text-sm font-medium !text-white transition-colors hover:bg-[#13294b]"
        >
          Subscribe to premium
        </Link>

        <Link
          href="/writings"
          className="inline-flex justify-center rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:border-gray-900"
        >
          Return to writings
        </Link>
      </div>
    </section>
  );
}
