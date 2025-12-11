// components/layout/Footer.jsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="text-center md:text-left">
          <p className="text-sm text-slate-400">
            Built with 💖 by <span className="text-pink-500 font-semibold">Sejal Godbole</span>
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Resume Project 2025 • Full Stack AI Generation
          </p>
        </div>

        <div className="flex gap-6">
          <Link href="#" className="text-sm text-slate-400 hover:text-pink-500 transition-colors">
            LinkedIn
          </Link>
          <Link href="#" className="text-sm text-slate-400 hover:text-pink-500 transition-colors">
            Twitter
          </Link>
          <Link href="#" className="text-sm text-slate-400 hover:text-pink-500 transition-colors">
            GitHub
          </Link>
        </div>

      </div>
    </footer>
  );
}