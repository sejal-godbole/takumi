import { SandpackProvider, SandpackLayout, SandpackPreview } from "@codesandbox/sandpack-react";
import { dracula as theme } from "@codesandbox/sandpack-themes";
import { Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";

export default function Preview({ code, framework }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  // Safety check: ensure code object exists
  const safeCode = code || {};

  // 1. Determine Template (React vs HTML)
  const isHTML = framework?.startsWith("html");
  const template = isHTML ? "static" : "react";

  // 2. FILE MAPPING (The "Anti-Crash" Layer)
  // We map the generated code to MULTIPLE filenames.
  // So if AI imports "./schema" OR "./validation" OR "./types", it all works.
  let files = {};

  if (isHTML) {
    files = {
      "/index.html": safeCode.jsx || "<h1>Ready to Generate HTML</h1>",
    };
  } else {
    const defaultReactCode = `
import { Sparkles } from "lucide-react";
export default function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-slate-950 text-white">
      <h1 className="text-2xl font-bold flex gap-2"><Sparkles className="text-pink-500"/> Ready</h1>
    </div>
  );
}
`;
    files = {
      "/App.js": safeCode.jsx || defaultReactCode,
      
      // HOOK ALIASES - Map the 'hook' code to all these paths
      "/useLogic.js": safeCode.hook || "export default function useLogic() {}",
      "/useContactForm.js": safeCode.hook || "export default function useLogic() {}",
      "/hooks.js": safeCode.hook || "export default function useLogic() {}",
      "/useForm.js": safeCode.hook || "export default function useLogic() {}",
      
      // SCHEMA ALIASES - Map the 'schema' code to all these paths
      "/schema.js": safeCode.schema || "export const schema = {}",
      "/validation.js": safeCode.schema || "export const schema = {}",
      "/types.js": safeCode.schema || "export const schema = {}",
      "/formSchema.js": safeCode.schema || "export const schema = {}",
      
      // DUMMY FILES - To prevent "Module not found" for common utils
      "/utils.js": "export function cn(...classes) { return classes.filter(Boolean).join(' '); }",
    };
  }

  const containerClass = isFullScreen 
    ? "fixed inset-0 z-50 bg-[#1e1e1e] flex flex-col animate-in fade-in zoom-in-95 duration-200" 
    : "h-full w-full bg-[#1e1e1e] flex flex-col border-l border-white/10 relative";

  return (
    <div className={containerClass}>
      
      {/* Header */}
      <div className="h-10 bg-slate-950 border-b border-white/10 flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
           <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{framework}</span>
        </div>
        <button 
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition"
        >
          {isFullScreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>

      <SandpackProvider
        key={framework} 
        template={template}
        theme={theme}
        files={files}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
          classes: { "sp-layout": "h-full" }
        }}
        customSetup={{
          // 3. THE "KITCHEN SINK" DEPENDENCIES
          // We pre-install EVERYTHING the AI might try to use.
          dependencies: {
            "lucide-react": "latest",
            "framer-motion": "latest",
            "clsx": "latest",
            "tailwind-merge": "latest",
            "react-hook-form": "latest",
            "zod": "latest",
            "@hookform/resolvers": "latest",
            "prop-types": "latest",
            "recharts": "latest",
            "date-fns": "latest",
            "react-day-picker": "latest",
            "@radix-ui/react-slot": "latest",
            "@radix-ui/react-dialog": "latest"
          },
        }}
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <SandpackLayout style={{ flex: 1, height: "100%", border: "none" }}>
          <SandpackPreview 
            style={{ height: "100%", flex: 1 }} 
            showOpenInCodeSandbox={false} 
            showRefreshButton={true} 
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}