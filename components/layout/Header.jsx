// components/layout/Header.jsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Github } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">

              <Image
                src="/logo1.png"
                alt="Logo"
                width={120}
                height={60}
                className="h-12 py-1 w-auto object-contain"
                priority
                />

        </Link>

        {/* Navigation Actions */}
        <div className="flex gap-4 items-center">
          <Link href="https://github.com/sejal-godbole" target="_blank">
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-pink-400 hover:bg-pink-500/10">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </Link>
          
          <Link href="/dashboard">
            <Button size="sm" className="bg-pink-600 hover:bg-pink-700 text-white border-0 shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-all">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}