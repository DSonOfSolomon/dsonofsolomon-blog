import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Writings", href: "/writings" },
  { label: "About", href: "/about" },
  { label: "Subscribe", href: "/subscribe" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-lg font-semibold tracking-tight">
        D•sonofSolomon
        </Link>

        <nav className="flex items-center gap-5 text-sm text-gray-600">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-gray-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
