// app/page.jsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutTemplate, Wand2, Database, Code2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// NEW IMPORTS
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-pink-500/30">
      
      <Header />

      <main className="flex-1 pt-24">
        
        {/* 1. HERO SECTION (Keep this exactly as you had it) */}
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 relative overflow-hidden">
          {/* ... (Your existing Hero Code) ... */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-pink-600/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto px-4 relative z-10">
            <div className="inline-flex items-center rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-sm font-medium text-pink-400 backdrop-blur-sm">
              ✨ AI-Powered Frontend Engineering
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white">
              Turn Ideas into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                React Code Instantly
              </span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-slate-400 sm:text-xl sm:leading-8">
              The only AI generator that respects your Design System. 
              Upload sketches, define your theme, and get production-ready code with Zod validation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Link href="/dashboard">
                <Button size="lg" className="h-12 px-8 text-lg bg-pink-600 hover:bg-pink-700 text-white border-0 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                  Start Building <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="h-12 px-8 text-lg border-white/10 text-slate-300 hover:bg-white/5 hover:text-white">
                  How it Works
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 2. FEATURES GRID (Keep this) */}
        <section id="features" className="container space-y-6 py-8 md:py-12 lg:py-24 mx-auto px-4">
          <div className="grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-4 mx-auto mt-8">
            <FeatureCard 
              icon={<LayoutTemplate className="h-10 w-10 text-pink-500" />}
              title="Sketch to Code"
              desc="Upload a napkin sketch and watch Gemini turn it into a working UI."
            />
            <FeatureCard 
              icon={<Wand2 className="h-10 w-10 text-purple-500" />}
              title="Theme Aware"
              desc="Set your brand colors once. The AI forces every component to match."
            />
            <FeatureCard 
              icon={<Database className="h-10 w-10 text-indigo-500" />}
              title="Full Logic"
              desc="Don't just get visuals. Get Zod schemas and hook logic automatically."
            />
             <FeatureCard 
              icon={<Code2 className="h-10 w-10 text-blue-500" />}
              title="Live Sandbox"
              desc="Render unsafe AI code securely in a browser-based sandbox environment."
            />
          </div>
        </section>

        {/* 3. NEW: TESTIMONIALS SECTION */}
        <Testimonials />

        {/* 4. NEW: FAQ SECTION */}
        <FAQ />

        {/* 5. NEW: FINAL CTA (Pre-footer) */}
        <section className="py-24 bg-gradient-to-t from-pink-900/20 to-slate-950 border-t border-white/5">
          <div className="container mx-auto px-4 text-center">
             <h2 className="text-3xl font-bold text-white mb-6">Ready to speed up your workflow?</h2>
             <Link href="/dashboard">
                <Button size="lg" className="h-12 px-8 text-lg bg-white text-pink-600 hover:bg-slate-200 border-0">
                  Build Your First Component
                </Button>
              </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

// (Keep FeatureCard helper at bottom)
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition-colors">
      <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
        {icon}
        <div className="space-y-2">
          <h3 className="font-bold text-white">{title}</h3>
          <p className="text-sm text-slate-400">{desc}</p>
        </div>
      </div>
    </div>
  );
}