"use client"

// components/dashboard/PromptInput.jsx
import { useState, useRef } from "react";
import { Paperclip, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// ACCEPT PROPS HERE
export default function PromptInput({ onGenerate, loading }) {
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => { /* ... Keep existing logic ... */ 
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    if (!input && !selectedImage) return;
    // Call the parent function
    onGenerate(input, selectedImage); 
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-2xl ring-1 ring-white/5 relative">
      {/* ... Keep Image Preview Logic ... */}
      
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={loading ? "Generating code..." : "Describe your component..."}
        disabled={loading} // Disable while generating
        className="w-full bg-transparent text-sm text-slate-200 resize-none focus:outline-none placeholder:text-slate-500 min-h-[50px] max-h-[200px]"
      />

      <div className="flex justify-between items-center pt-2 border-t border-white/5 mt-2">
        <div className="flex gap-2">
           {/* ... Keep File Input ... */}
           <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
           <Button variant="ghost" size="icon" onClick={() => fileInputRef.current.click()}>
             <Paperclip size={18} className="text-slate-400" />
           </Button>
        </div>

        <Button 
          size="sm" 
          onClick={handleClick}
          disabled={loading} // Disable button while loading
          className="bg-gradient-to-r from-pink-600 to-purple-600 text-white"
        >
          {loading ? (
             <span className="animate-pulse">Generating...</span>
          ) : (
             <>
               <Sparkles size={16} className="mr-2" /> Generate
             </>
          )}
        </Button>
      </div>
    </div>
  );
}