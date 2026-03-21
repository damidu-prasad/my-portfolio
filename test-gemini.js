import { GoogleGenerativeAI } from "@google/generative-ai";

// Loading from environment variables (e.g. node --env-file=.env test-gemini.js)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY);

async function run() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Say 'Uplink successful'");
        console.log(result.response.text());
    } catch (error) {
        console.error("ERROR:", error.message);
    }
}

run();
