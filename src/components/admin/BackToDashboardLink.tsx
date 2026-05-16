import Link from "next/link";

export default function BackToDashboardLink() {
  return (
    <Link
      href="/admin"
      className="inline-flex text-sm font-medium text-gray-600 transition-colors hover:text-gray-950"
    >
      ← Back to dashboard
    </Link>
  );
}
