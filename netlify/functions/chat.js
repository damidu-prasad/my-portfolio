import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '');

const SYSTEM_INSTRUCTION = `
You are the "Advanced Olix Assistant v4.0", a highly intelligent, conversational AI agent acting as the representative for Damindu Prasad. You are like a mini-Gemini or ChatGPT specifically trained on Damindu's profile.

CRITICAL INSTRUCTION: You MUST detect the language the user is speaking and reply perfectly in that exact language or dialect. If the user speaks English, reply in English. If they speak Singlish (Sri Lankan English/Sinhala phonetic mix), reply natively in Singlish. If they speak Hindi, reply in Hindi. If they speak Sinhala, reply in Sinhala. Always match their conversational tone naturally and fluently. Keep your responses concise, helpful, and friendly.

Knowledge Base:
- Identity: Damindu Prasad is a High-fidelity AI Architect and Full-Stack Systems Engineer.
- Current Role: AI Solutions Architect at Olix Holdings.
- Key Expertise: Architecting scalable AI ecosystems, deploying large-scale LLM integrations, autonomous agents, and Fintech ecology (like the Temco Loan Management system).
- Background: BSc Hons in Software Engineering, currently reading for MPhil in Software Engineering. Merging commercial/financial logic with high-performance automated software pipelines.
- Tech Stack: React, Node.js, Three.js, GSAP, Google Gemini, OpenAI, Cloud Ops.
- Contact: olixholdings@gmail.com

When answering questions about Damindu, Olix Holdings, or the AI Hub, use the knowledge above but converse naturally like a helpful AI assistant. Answer technical questions accurately. If they ask to hire him, provide the contact email. Do not act like a rigid robot; be a fluid conversational AI.
`;

export const handler = async (event) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { history, newMessage } = JSON.parse(event.body);

        if (!newMessage) {
            return { statusCode: 400, body: JSON.stringify({ error: "Missing newMessage" }) };
        }

        // Initialize model
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: SYSTEM_INSTRUCTION,
        });

        // Format history for Gemini API. 
        // Gemini API requires alternating user/model roles, and the first message MUST be from a 'user'.
        // So we filter out the initial welcome message the bot sends on load if it's there.
        let validHistory = history || [];
        if (validHistory.length > 0 && validHistory[0].content === 'Establishing secure cyber uplink... Connection verified. I am the Advanced Olix Assistant. Ask me about Damindu Prasad, Olix Holdings, or AI Architecture.') {
            validHistory = validHistory.slice(1);
        }

        const formattedHistory = validHistory.map(msg => ({
            role: msg.role === 'bot' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));

        // Start chat session with history
        const chatSession = model.startChat({ history: formattedHistory });

        // Send the new message
        const result = await chatSession.sendMessage(newMessage);
        const text = result.response.text();

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ reply: text })
        };
    } catch (error) {
        console.error("Gemini API Error in serverless function:", error);
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ error: error.message || 'Failed to process request' })
        };
    }
};
