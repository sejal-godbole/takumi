import { Button } from "@/components/ui/button";
import { Download, Share2, Sparkles, Link as LinkIcon } from "lucide-react"; // Rename Icon if used
import NextLink from "next/link"; // Rename Navigation Component
import Image from "next/image";

export default function DashboardHeader() {
  return (
    <header className="h-14 border-b border-white/10 bg-slate-950 flex items-center justify-between px-4 sticky top-0 z-50">
      
      {/* Left: Branding & File Name */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 font-bold text-lg text-slate-100">
  
          {/* USE NextLink HERE (The Navigator) */}
          <NextLink href="/">
              <Image
                src="/logo1.png"
                alt="Logo"
                width={120}
                height={60}
                className="h-12 py-1 w-auto object-contain"
                priority
              />
          </NextLink>
        </div>
        <div className="h-6 w-[1px] bg-white/10 mx-2" />
        <span className="text-sm text-slate-400">Untitled-Project-1</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
          <Share2 size={16} className="mr-2" />
          Share
        </Button>
        <Button size="sm" className="bg-pink-600 hover:bg-pink-700 text-white">
          <Download size={16} className="mr-2" />
          Export Code
        </Button>
      </div>
    </header>
  );
}