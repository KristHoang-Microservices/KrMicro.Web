import "@/styles/globals.css";
import { Providers } from "@/components/Providers";
import { ReactElement } from "react";
import { Metadata } from "next";
import { customFont } from "@/constants/";

export const metadata: Metadata = {
  description: "August Perfume, nơi lưu giữ lại hương thơm thanh lịch",
};

export default function RootLayout({ children }: { children: ReactElement }) {
  return (
    <html lang="en">
      <head>
        <link rel={"icon"} href={"/static/logo.jpg"} sizes={"any"} />
        <link
          rel={"apple-touch-icon"}
          href={"/static/logo.jpg"}
          sizes={"any"}
        />
        <title>August Perfume</title>
      </head>
      <body className={customFont.className}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
