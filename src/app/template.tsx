"use client";
import { ReactElement, ReactNode } from "react";
import { Navigation } from "@/components/Navbar";
import { PageLayout } from "@/components/PageLayout";
import { Footer } from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function DefaultTemplate({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const pathname = usePathname();

  const excludedLayout = ["/login"];

  if (excludedLayout.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation />
      <PageLayout>
        {children}
        <Footer />
      </PageLayout>
    </>
  );
}
