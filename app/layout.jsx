import { GoogleAnalytics } from "@next/third-parties/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: {
    default: "Phim Ảnh",
    template: "%s | Phim Ảnh",
  },
  description: "Website phim ảnh",
};
export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <meta
          name="google-site-verification"
          content="stTNpzhUhDWsmItkRQOlRO228yBU2r5AgC1xV1CkMjI"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <GoogleAnalytics gaId="G-1H89YNQYZK" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
