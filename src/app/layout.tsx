import "./globals.css";

export const metadata = {
  title: "Shojahon Toshov | Creative Engineer",
  description: "Portfolio of Shojahon Toshov - Fullstack Developer & Creative Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#e8e7e3] text-black">
        {children}
      </body>
    </html>
  );
}
