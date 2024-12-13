import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google"

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
      <body className={`${poppins.className} antialiased`} style={poppins.style}>
        {children}
      </body>
    </html>
  );
}
