import Link from "next/link";
import {
  FiInstagram,
  FiTwitter,
} from "react-icons/fi";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12">
        {/* Identity */}
        <div className="space-y-3">
          <p className="text-lg font-semibold tracking-tight text-gray-950">
            DSonOfSolomon
          </p>

          <p className="max-w-2xl text-sm leading-7 text-gray-600">
            Essays, ideas, observations and systems.
          </p>
        </div>

        {/* Subscribe CTA */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-900">
            Subscribe for new writings and updates.
          </p>

          <Link
            href="/subscribe"
            className="inline-flex items-center rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-900 transition-colors hover:border-gray-900"
          >
            Subscribe
          </Link>
        </div>

        {/* Socials */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-900">
            Connect
          </p>

          <div className="flex items-center gap-5 text-gray-500">
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gray-950"
            >
              <FiTwitter size={18} />
            </a>

            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gray-950"
            >
              <FiInstagram size={18} />
            </a>

            <a
              href="https://tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gray-950"
            >
              TikTok
            </a>
          </div>
        </div>

        {/* Current focus */}
        <div>
          <p className="text-sm text-gray-600">
            Currently working on the DSonOfSolomon writing system.
          </p>
        </div>

        {/* Bottom line */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            © {currentYear} DSonOfSolomon
          </p>
        </div>
      </div>
    </footer>
  );
}