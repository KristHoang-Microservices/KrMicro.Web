import "@/styles/globals.css";
import { Providers } from "@/components/Providers";
import { ReactElement } from "react";
import { Navigation } from "@/components/Navbar";
import { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import { customFont } from "@/constants/";
import { Footer } from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";

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
        <Providers>
          <main>
            <Navigation />
            <PageLayout>
              {children}

              <Toaster position={"bottom-right"} />
              <Footer />
            </PageLayout>
          </main>
        </Providers>
      </body>
    </html>
  );
}
