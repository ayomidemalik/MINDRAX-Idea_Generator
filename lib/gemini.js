// lib/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateContent(prompt) {
  try {
    // Use the correct model name
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest"
    });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    
    // Check if it's an API key issue
    if (error.message.includes('API_KEY') || error.message.includes('key') || error.message.includes('401')) {
      throw new Error("Invalid API key. Please check your GEMINI_API_KEY in .env");
    }
    
    // Check if it's a model not found issue
    if (error.message.includes('404') || error.message.includes('not found')) {
      throw new Error("The AI model is currently unavailable. Please try again later.");
    }
    
    // Check if it's a quota or rate limit issue
    if (error.message.includes('quota') || error.message.includes('rate') || error.message.includes('429')) {
      throw new Error("API quota exceeded. Please try again later or check your Google AI Studio quota.");
    }
    
    throw new Error("Failed to generate content. Please try again.");
  }
}