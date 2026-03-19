import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";


const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DiabCare — คู่มือสุขภาพเบาหวาน",
  description:
    "รวมข้อมูลครบจบในที่เดียว ทั้งการรับประทานยา อาหารที่ควรกินและควรเลี่ยง ผลไม้ที่มีน้ำตาลสูง พร้อมเคล็ดลับดูแลสุขภาพสำหรับผู้ป่วยเบาหวาน",
  icons: {
    icon: "/notebook.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${notoSansThai.variable} antialiased`}>
      <body className="min-h-screen">
        {children}
        {/* <ChatWidget /> */}
      </body>
    </html>
  );
}
