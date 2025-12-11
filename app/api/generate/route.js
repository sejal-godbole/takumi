import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "API Key missing" }, { status: 500 });

    const { prompt, image, settings } = await req.json();
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 1. SETUP VARIABLES
    const getColorName = (hex) => { /* ... Keep existing color logic ... */ 
      const colors = { "#ec4899": "pink", "#3b82f6": "blue", "#10b981": "emerald", "#f59e0b": "amber", "#6366f1": "indigo", "#ef4444": "red", "#a855f7": "purple", "#06b6d4": "cyan" };
      return colors[hex] || "blue";
    };
    const selectedColor = getColorName(settings?.color);
    const radius = settings?.radius || 8;
    const framework = settings.framework || "react-tailwind";
    const language = settings.language || "typescript"; // Default to TS if undefined

    // 2. LANGUAGE INSTRUCTIONS
    let langInstruction = "";
    if (language === "javascript") {
      langInstruction = `
        LANGUAGE: JavaScript (.jsx).
        - DO NOT use TypeScript interfaces or types.
        - DO NOT use ': string' or ': number' annotations.
        - Use standard React props.
      `;
    } else {
      langInstruction = `
        LANGUAGE: TypeScript (.tsx).
        - Use interfaces for Props (e.g., interface CardProps {}).
        - Use proper typing for events (e.g., React.FormEvent).
      `;
    }

    // 3. SYSTEM PROMPT
    const systemInstruction = `
      You are an expert Frontend Architect.
      
      USER SETTINGS:
      - Stack: ${framework}
      - Color: ${selectedColor}
      - Radius: ${radius}px
      ${langInstruction}

      🛡️ CODING RULES:
      1. **DEFAULT PROPS:** You MUST provide default values for ALL props to prevent crashes.
      2. **IMPORTS:** - Logic/Hooks -> './useLogic'
         - Schemas -> './schema'
         - Icons -> 'lucide-react'
      3. **DEPENDENCIES:** Only use lucide-react, framer-motion, clsx, tailwind-merge, zod, react-hook-form.

      🎨 DESIGN:
      - Use Glassmorphism (backdrop-blur) and Shadows.
      - Use 'bg-${selectedColor}-600' for primary actions.

      RETURN JSON ONLY: { "jsx": "...", "schema": "...", "hook": "..." }
    `;

    const promptParts = [systemInstruction, `User Request: ${prompt}`];
    
    // ... (Keep existing image handling and response parsing logic) ...
    if (image) { try { const base64Data = image.split(",")[1]; promptParts.push({ inlineData: { data: base64Data, mimeType: "image/png" } }); } catch (e) { console.log("Image skipped"); } }

    const result = await model.generateContent(promptParts);
    const response = await result.response;
    let text = response.text().replace(/```json/g, "").replace(/```/g, "").trim();

    try {
      const parsedData = JSON.parse(text);
      return NextResponse.json(parsedData);
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 500 });
    }

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "AI Busy" }, { status: 503 });
  }
}