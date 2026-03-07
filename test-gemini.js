import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyD7AvvFZGGyD6m_-Rfk_VWTVPqTKySImS8");

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
