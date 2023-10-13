import { ReactElement, ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps): ReactElement {
  return (
    <main className={"md:px-24 px-4 py-8 overflow-hidden"}>{children}</main>
  );
}
