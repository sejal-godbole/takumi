"use client"

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { FileCode2, FileJson, Braces, Copy, Check } from "lucide-react";

export default function CodeEditor({ code, loading }) {
  const [activeTab, setActiveTab] = useState("jsx");
  const [copied, setCopied] = useState(false);

  // Map tabs to the incoming code prop
  // We use safe defaults so it never crashes even if data is missing
  const content = {
    jsx: code?.jsx || "// Code will appear here...",
    schema: code?.schema || "// Zod schema will appear here...",
    hook: code?.hook || "// Custom hooks will appear here..."
  };

  // 📋 THE COPY FUNCTION
  const handleCopy = async () => {
    const textToCopy = content[activeTab];
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      // Reset the icon back to "Copy" after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      
      {/* 1. Header Bar: Tabs on Left, Actions on Right */}
      <div className="flex items-center justify-between bg-[#0f0f11] border-b border-white/5 pr-4">
        
        {/* TABS */}
        <div className="flex">
          <Tab 
            label="Component.jsx" 
            icon={<FileCode2 size={14} className="text-blue-400" />} 
            isActive={activeTab === 'jsx'} 
            onClick={() => setActiveTab('jsx')} 
          />
          <Tab 
            label="schema.ts" 
            icon={<Braces size={14} className="text-yellow-400" />} 
            isActive={activeTab === 'schema'} 
            onClick={() => setActiveTab('schema')} 
          />
          <Tab 
            label="useLogic.ts" 
            icon={<FileJson size={14} className="text-green-400" />} 
            isActive={activeTab === 'hook'} 
            onClick={() => setActiveTab('hook')} 
          />
        </div>

        {/* ACTION BUTTONS */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition-all"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>

      </div>

      {/* 2. Monaco Editor */}
      <div className="flex-1 relative">
        {loading && (
           <div className="absolute inset-0 z-50 bg-[#1e1e1e]/80 flex items-center justify-center">
             <div className="text-pink-500 font-mono animate-pulse flex flex-col items-center gap-2">
                <span className="text-xl">✨</span>
                Writing code...
             </div>
           </div>
        )}
        
        <Editor
          height="100%"
          defaultLanguage={activeTab === 'jsx' ? 'javascript' : 'typescript'}
          language={activeTab === 'jsx' ? 'javascript' : 'typescript'}
          theme="vs-dark"
          value={content[activeTab]} 
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 20 },
            scrollBeyondLastLine: false,
            fontFamily: "JetBrains Mono, monospace",
            lineHeight: 22,
          }}
        />
      </div>
    </div>
  );
}

// Helper Component for Tabs
function Tab({ label, icon, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-3 text-xs font-medium border-r border-white/5 transition-colors
        ${isActive ? 'bg-[#1e1e1e] text-slate-200 border-t-2 border-t-pink-500' : 'bg-transparent text-slate-500 hover:bg-[#1e1e1e]/50 hover:text-slate-300'}
      `}
    >
      {icon}
      {label}
    </button>
  );
}