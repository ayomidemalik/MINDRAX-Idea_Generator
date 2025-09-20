require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testAPI() {
  // Check if API key is loaded
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY not found in environment variables");
    console.log("Make sure your .env.local file has: GEMINI_API_KEY=your_actual_key_here");
    return;
  }

  console.log("✅ API key found, length:", process.env.GEMINI_API_KEY.length);
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    console.log("Testing API key...");
    
    // Try different methods based on SDK version
    try {
      // For newer versions
      const models = await genAI.listModels();
      console.log("✅ Available models:");
      models.models.forEach(model => {
        console.log(`- ${model.name}`);
        if (model.supportedGenerationMethods) {
          console.log(`  Supported methods: ${model.supportedGenerationMethods.join(', ')}`);
        }
      });
    } catch (listError) {
      console.log("listModels() failed, trying getGenerativeModel directly...");
      
      // Test with a simple model call
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
      const result = await model.generateContent("Hello");
      console.log("✅ Direct model test successful!");
      console.log("Response:", result.response.text());
    }
    
  } catch (error) {
    console.error("❌ API test failed:", error.message);
    console.log("Error details:", error);
    
    // Check for specific error types
    if (error.message.includes('API_KEY')) {
      console.log("🔑 API key issue - please check your Google AI Studio key");
    } else if (error.message.includes('404')) {
      console.log("🌍 Region/access issue - your region might not have access");
    } else {
      console.log("🤖 General API issue - check your SDK version and setup");
    }
  }
}

testAPI();