// app/layout.jsx
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Takumi",
  description: "Generate React UI with AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark"> 
      {/* className="dark" forces dark mode */}
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased`}>
        {children}
      </body>
    </html>
  );
}