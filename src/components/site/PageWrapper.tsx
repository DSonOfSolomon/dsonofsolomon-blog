import { ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
};

export default function PageWrapper({
  children,
}: PageWrapperProps) {
  return (
    <main className="min-h-screen py-16 md:py-24">
      {children}
    </main>
  );
}