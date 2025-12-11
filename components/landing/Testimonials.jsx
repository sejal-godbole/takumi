// components/landing/Testimonials.jsx
import { Star } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "Frontend Lead @ TechFlow",
      content: "I used to spend 4 hours slicing designs. With ComponentAI, I upload the sketch and get 90% perfect Tailwind code in seconds.",
    },
    {
      name: "Mark D.",
      role: "Indie Hacker",
      content: "The Zod schema generation is a game changer. It doesn't just build the UI, it builds the validation logic for me.",
    },
    {
      name: "Elena R.",
      role: "UX Designer",
      content: "Finally, an AI that respects my design tokens. The hex-code awareness means I don't have to fix the colors manually.",
    },
  ];

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-white">
          Loved by <span className="text-pink-500">Developers</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div 
              key={i} 
              className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-pink-500/30 transition-all duration-300 group"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">"{review.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{review.name}</h4>
                  <p className="text-xs text-slate-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}