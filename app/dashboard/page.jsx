"use client"; // IMPORTANT: This must be a Client Component now

import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import DashboardHeader from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import CodeEditor from "@/components/dashboard/CodeEditor";
import Preview from "@/components/dashboard/Preview";
import PromptInput from "@/components/dashboard/PromptInput";

export default function DashboardPage() {
  // 1. STATE LIVES HERE (The Single Source of Truth)
  const [generatedCode, setGeneratedCode] = useState({
    jsx: "// Your generated component will appear here...",
    schema: "// Zod schema will appear here...",
    hook: "// Custom hooks will appear here...",
  });
  const [loading, setLoading] = useState(false);

  // Settings State (Default Blue & Rounded)
  const [settings, setSettings] = useState({
    color: "#3b82f6",
    radius: "8",
  });

  // 2. The Function that calls the API
  async function handleGenerate(prompt, image) {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          image,
          settings, // We pass the selected settings to the AI
        }),
      });

      const data = await res.json();
      if (data.jsx) {
        setGeneratedCode(data);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong generating code.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex flex-col bg-slate-950 overflow-hidden text-slate-100 font-sans">
      <DashboardHeader />

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full w-full rounded-none border-0"
        >
          {/* LEFT: Sidebar (Pass setters to update settings) */}
          <ResizablePanel
            defaultSize={20}
            minSize={15}
            maxSize={25}
            className="bg-slate-950/50"
          >
            <Sidebar settings={settings} setSettings={setSettings} />
          </ResizablePanel>

          <ResizableHandle className="bg-white/5 w-[1px]" />

          {/* CENTER: Code Editor + Prompt */}
          <ResizablePanel defaultSize={40} minSize={30}>
            <div className="flex flex-col h-full relative">
              {/* Pass the Generated Code & Loading State down */}
              <CodeEditor code={generatedCode} loading={loading} />

              {/* Pass the Generate Function down */}
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <PromptInput onGenerate={handleGenerate} loading={loading} />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle className="bg-white/5 w-[1px]" />

          {/* RIGHT: Preview */}
          <ResizablePanel defaultSize={40} minSize={30}>
            {/* Pass the 'framework' setting to the preview! */}
            <Preview
              code={generatedCode}
              framework={settings.framework || "react-tailwind"}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
