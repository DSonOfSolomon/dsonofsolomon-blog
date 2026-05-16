import Link from "next/link";
import { FiInstagram } from "react-icons/fi";
import { BsTwitterX } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa6";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-gray-200 bg-[#f7f5ef]">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-[1.6fr_1fr] md:items-end">
          <div className="space-y-3">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.32em] text-gray-500">
              DSonOfSolomon
            </p>

            <p className="max-w-2xl text-xl font-semibold tracking-tight text-gray-950 md:text-2xl">
              Essays, ideas, observations and systems.
            </p>

            <p className="max-w-2xl text-sm leading-7 text-gray-600">
              A quieter place for considered writing on life, pattern, and
              perspective.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <Link
              href="/follow"
              className="inline-flex items-center rounded-full bg-[#0a192f] px-5 py-2.5 text-sm font-medium !text-white transition-colors hover:bg-[#13294b]"
            >
              Follow
            </Link>

            <div className="flex items-center gap-3 text-gray-500">
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:text-gray-950"
                aria-label="X"
              >
                <BsTwitterX size={16} />
              </a>

              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:text-gray-950"
                aria-label="Instagram"
              >
                <FiInstagram size={16} />
              </a>

              <a
                href="https://tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:text-gray-950"
                aria-label="TikTok"
              >
                <FaTiktok size={15} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-gray-200 pt-5 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Currently working on the DSonOfSolomon writing system.</p>
          <p>© {currentYear} DSonOfSolomon</p>
        </div>
      </div>
    </footer>
  );
}
