import "@/styles/globals.css";
import { Providers } from "@/components/Providers";
import { ReactElement } from "react";
import { Navigation } from "@/components/Navbar";
import { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import { customFont } from "@/constants/";
import { Footer } from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "August Perfume",
};

export default function RootLayout({ children }: { children: ReactElement }) {
  return (
    <html lang="en">
      <head>
        <link rel={"shortcut icon"} href={"/static/logo.jpg"} sizes={"any"} />
        <title>August Perfume</title>
      </head>
      <body className={customFont.className}>
        <Navigation />
        <Providers>
          <PageLayout>{children}</PageLayout>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
