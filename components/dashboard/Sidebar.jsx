import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch"; // Import Switch
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wand2, Palette, LayoutTemplate, FileJson } from "lucide-react";

export default function Sidebar({ settings, setSettings }) {
  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  // Helper to check if we are in a React environment
  const isReact = settings.framework?.includes("react") || settings.framework?.includes("next");

  return (
    <div className="h-full border-r border-white/10 bg-slate-950/50">
      <div className="p-4 border-b border-white/10">
        <h2 className="font-semibold text-white text-sm flex items-center gap-2">
          <Wand2 size={16} className="text-pink-500" />
          Generation Settings
        </h2>
      </div>
      
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="p-4 space-y-8">
          
          {/* FRAMEWORK SELECTION */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 flex items-center gap-2">
              <LayoutTemplate size={12} /> TECH STACK
            </h3>
            <div className="space-y-2">
              <Label className="text-slate-300">Framework</Label>
              <Select 
                value={settings.framework || "react-tailwind"} 
                onValueChange={(val) => handleChange("framework", val)}
              >
                <SelectTrigger className="bg-slate-900 border-white/10 text-slate-200">
                  <SelectValue placeholder="Select stack" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-slate-200">
                  <SelectGroup>
                    <SelectLabel className="text-slate-500 text-xs mt-2">Modern React</SelectLabel>
                    <SelectItem value="react-tailwind">React + Tailwind</SelectItem>
                    <SelectItem value="react-framer">React + Framer Motion</SelectItem>
                    <SelectItem value="next-tailwind">Next.js + Tailwind</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel className="text-slate-500 text-xs mt-2">Vanilla Web</SelectLabel>
                    <SelectItem value="html-css">HTML + CSS</SelectItem>
                    <SelectItem value="html-tailwind">HTML + Tailwind</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* 🟡 NEW: JAVASCRIPT / TYPESCRIPT TOGGLE */}
            {isReact && (
              <div className="flex items-center justify-between border border-white/5 p-3 rounded-lg bg-white/5">
                <div className="space-y-0.5">
                  <Label className="text-slate-200 flex items-center gap-2">
                     <FileJson size={14} className="text-blue-400" />
                     TypeScript
                  </Label>
                  <span className="text-[10px] text-slate-500">
                    {settings.language === "javascript" ? "Off (Using .jsx)" : "On (Using .tsx)"}
                  </span>
                </div>
                <Switch 
                  checked={settings.language !== "javascript"}
                  onCheckedChange={(checked) => handleChange("language", checked ? "typescript" : "javascript")}
                />
              </div>
            )}
          </div>

          {/* THEME SETTINGS */}
          {isReact && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-500 flex items-center gap-2">
                <Palette size={12} /> THEME
              </h3>
              {/* ... (Keep existing color/radius sliders same as before) ... */}
              <div className="space-y-3">
                <Label className="text-slate-300">Primary Color</Label>
                <div className="flex gap-2">
                  {['#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#6366f1'].map((color) => (
                    <button 
                      key={color} 
                      onClick={() => handleChange("color", color)}
                      className={`w-6 h-6 rounded-full ring-offset-2 ring-offset-slate-950 transition-all hover:scale-110 ${settings.color === color ? 'ring-2 ring-white' : ''}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="text-slate-300">Border Radius</Label>
                  <span className="text-xs text-slate-500">{settings.radius}px</span>
                </div>
                <Slider 
                  value={[parseInt(settings.radius || 8)]} 
                  onValueChange={(val) => handleChange("radius", val[0])}
                  max={24} 
                  step={4} 
                  className="py-2" 
                />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}