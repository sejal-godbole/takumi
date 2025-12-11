// components/landing/FAQ.jsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section className="py-24 bg-slate-950 border-t border-white/5">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-white">
          Frequently Asked <span className="text-purple-500">Questions</span>
        </h2>

        <Accordion type="single" collapsible className="w-full">
          
          <AccordionItem value="item-1" className="border-b border-white/10">
            <AccordionTrigger className="text-slate-200 hover:text-pink-500 hover:no-underline text-lg">
              Is the generated code production ready?
            </AccordionTrigger>
            <AccordionContent className="text-slate-400">
              Yes. We generate standard React code using Tailwind CSS and Lucide Icons. 
              The code is clean, semantic, and can be copied directly into your project.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-b border-white/10">
            <AccordionTrigger className="text-slate-200 hover:text-pink-500 hover:no-underline text-lg">
              Does it support custom themes?
            </AccordionTrigger>
            <AccordionContent className="text-slate-400">
              Absolutely. You can define your primary colors, border radius, and font preferences 
              in the dashboard. The AI will strictly follow your design tokens.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-b border-white/10">
            <AccordionTrigger className="text-slate-200 hover:text-pink-500 hover:no-underline text-lg">
              How does the "Sketch to UI" work?
            </AccordionTrigger>
            <AccordionContent className="text-slate-400">
              We use Gemini Pro Vision 1.5. You upload an image, and the AI analyzes the visual hierarchy, 
              layout, and elements to reconstruct it in code.
            </AccordionContent>
          </AccordionItem>
          
           <AccordionItem value="item-4" className="border-b-0">
            <AccordionTrigger className="text-slate-200 hover:text-pink-500 hover:no-underline text-lg">
              Is this free to use?
            </AccordionTrigger>
            <AccordionContent className="text-slate-400">
              Yes, this is a portfolio project and is currently free to use with your own API key.
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </section>
  );
}