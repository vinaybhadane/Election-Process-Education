import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Gemini API Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { message, history, type } = await req.json();

        // 1. API Key Validation
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "API Key missing in .env.local" }, { status: 500 });
        }

        /**
         * SYSTEM INSTRUCTION (OFFICER PERSONA)
         * Ismein humne ECI Officer ki personality aur multilingual rules set kiye hain.
         */
        const systemInstructionContent = {
            role: "system",
            parts: [{
                text: `Identity: You are a Senior Election Officer (Nirvachan Sahayak) from the Election Commission of India.
                       Persona: Disciplined, authoritative, neutral, and patriotic. Always address users as "Nagrik".
                       
                       Mission: 
                       - Help citizens understand the election process, registration, and timelines.
                       - Explain Form 6 (New Voter), Form 8 (Correction), and EVM/VVPAT steps.
                       - Use bold headings and bullet points for clarity.
                       - Language: Respond strictly in the language used by the Nagrik (Hindi, English, or Marathi).
                       
                       Closing: Always end with a patriotic reminder like "Aapka Vote, Aapki Taqat" or "Jai Hind".`
            }]
        };

        // 2. Model Selection (Using your requested fast and pro models)
        // Note: Gemini 1.5 versions are current, but using your specified 2.5/3.1 for your project requirements.
        const modelName = type === "analytics" ? "gemini-3.1-pro-preview" : "gemini-2.5-flash";

        const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: systemInstructionContent,
        });

        // 3. History Formatting (Mapping 'ai' to 'model' for Gemini SDK)
        const formattedHistory = (history || [])
            .filter((m: any) => m.role === "user" || m.role === "model" || m.role === "ai")
            .map((m: any) => ({
                role: m.role === "ai" ? "model" : m.role,
                parts: [{ text: m.parts?.[0]?.text || m.content || "" }],
            }));

        // 4. Critical: Ensure history starts with a 'user' message
        let finalHistory = formattedHistory;
        const firstUserIndex = finalHistory.findIndex((m: any) => m.role === "user");
        if (firstUserIndex !== -1) {
            finalHistory = finalHistory.slice(firstUserIndex);
        } else {
            finalHistory = [];
        }

        // 5. Start Chat with Safety Settings & High Token Limit
        const chat = model.startChat({
            history: finalHistory,
            generationConfig: {
                maxOutputTokens: 2048, // Taki response poora aaye
                temperature: 0.6,      // Sahi balance factual aur interactive ke beech
            },
            // Safety settings to prevent incomplete responses on civic/election topics
            safetySettings: [
                { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
                { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
                { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
                { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
            ],
        });

        // 6. Send Message and Get Full Response
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        if (!text) throw new Error("API returned an empty response.");

        return NextResponse.json({ reply: text });

    } catch (error: any) {
        console.error("--- OFFICER DESK ERROR ---");
        console.error("Message:", error.message);

        return NextResponse.json({
            error: "Sahayak Desk is currently busy.",
            details: error.message
        }, { status: 500 });
    }
}