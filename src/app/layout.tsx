import "./globals.css";
import Providers from "../components/Providers";

export const metadata = {
  title: "Shojahon Toshov | Creative Engineer",
  description: "Portfolio of Shojahon Toshov - Fullstack Developer & Creative Engineer",
  openGraph: {
    title: "Shojahon Toshov | Creative Engineer",
    description: "Portfolio of Shojahon Toshov - Fullstack Developer & Creative Engineer",
    url: "https://shojahon.com",
    siteName: "Shojahon Toshov Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#e8e7e3] text-black">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
