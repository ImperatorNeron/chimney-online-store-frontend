import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import { Bounce, ToastContainer } from "react-toastify";
import RefreshCheck from "@/components/modules/auth/components/RefreshAuthComponent";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Димок — інтернет-магазин димоходів та комплектуючих",
    template: "%s | Димок",
  },
  description: "Купити димохід від виробника з доставкою по Україні. Великий вибір димохідних систем, труб, трійників, ревізій. Якість та гарантія.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  openGraph: {
    siteName: "Димок",
    locale: "uk_UA",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RefreshCheck />
        {children}
        <ToastContainer
          position="bottom-right"
          theme="light"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          transition={Bounce}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
