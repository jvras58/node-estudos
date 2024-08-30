const { GoogleGenerativeAI } = require("@google/generative-ai");



export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    // systemInstruction: "you are a consultant and you are talking to a client",
});
