import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google"
import TawkToChat from "@/components/Tawk";
import dotenv from 'dotenv';
import Script from "next/dist/client/script";

dotenv.config();

const poppins = Poppins({
  display: "swap",
  subsets: ["latin"],
  // variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: "NaijaZone | Home",
  description: " NaijaZone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Load gtag.js */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        
        {/* Initialize gtag */}
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
            `,
          }}
        />

        
      </head>
      <body className={`${poppins.className} antialiased`} style={poppins.style}>
        {children}
      </body>
    </html>
  );
}
