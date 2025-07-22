// Rate-limited version of your Gemini service, directly calling OpenRouter API
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_SITE_URL = import.meta.env.VITE_OPENROUTER_SITE_URL || "https://civicbot.example.com";
const OPENROUTER_SITE_NAME = import.meta.env.VITE_OPENROUTER_SITE_NAME || "CivicBot";

if (!OPENROUTER_API_KEY) {
  console.error('VITE_OPENROUTER_API_KEY is not set in the .env file.');
  // In a real application, consider throwing an error or disabling AI features.
}

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL_NAME = "google/gemini-2.0-flash-exp:free";

// Rate limiting variables
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 2000; // 2 seconds between requests
const requestQueue: Array<{ requestFn: () => Promise<any>; resolve: (value: any) => void; reject: (reason?: any) => void }> = [];
let isProcessingQueue = false;

/**
 * Delays execution for specified milliseconds
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Rate-limited API call wrapper
 */
async function makeRateLimitedRequest<T>(requestFn: () => Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    requestQueue.push({ requestFn, resolve, reject });
    processQueue();
  });
}

async function processQueue() {
  if (isProcessingQueue || requestQueue.length === 0) return;
  
  isProcessingQueue = true;
  
  while (requestQueue.length > 0) {
    const { requestFn, resolve, reject } = requestQueue.shift()!;
    
    try {
      // Ensure minimum time between requests
      const timeSinceLastRequest = Date.now() - lastRequestTime;
      if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
        await delay(MIN_REQUEST_INTERVAL - timeSinceLastRequest);
      }
      
      lastRequestTime = Date.now();
      const result = await requestFn();
      resolve(result);
      
      // Small delay between queued requests
      await delay(500);
      
    } catch (error) {
      reject(error);
    }
  }
  
  isProcessingQueue = false;
}

/**
 * Makes the actual OpenRouter API call with retry logic
 */
async function makeOpenRouterCall(messages: any[], maxRetries = 3): Promise<string> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(OPENROUTER_BASE_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": OPENROUTER_SITE_URL,
          "X-Title": OPENROUTER_SITE_NAME,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": MODEL_NAME,
          "messages": messages
        })
      });

      if (response.status === 429) {
        // Exponential backoff for rate limits
        const waitTime = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
        console.warn(`Rate limited. Retrying in ${waitTime}ms... (Attempt ${attempt}/${maxRetries})`);
        
        if (attempt === maxRetries) {
          throw new Error(`Rate limited after ${maxRetries} attempts. Please try again in a few minutes.`);
        }
        
        await delay(waitTime);
        continue;
      }

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        console.error('OpenRouter API Error:', response.status, errorBody);
        
        if (response.status === 401) {
          throw new Error("Authentication failed. Please check your OpenRouter API key.");
        } else if (response.status >= 500) {
          throw new Error("The AI model is currently unavailable. Please try again later.");
        }
        
        throw new Error(`API Error: ${errorBody.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;

    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Wait before retrying on network errors
      await delay(1000 * attempt);
    }
  }
  throw new Error("Failed to make OpenRouter call after multiple retries."); // Should not be reached but for type safety
}

/**
 * Generates a response from the AI model via OpenRouter, with rate limiting.
 */
export async function getGeminiResponse(userMessage: string): Promise<string> {
  if (!OPENROUTER_API_KEY) {
    return "API key is missing. Please set VITE_OPENROUTER_API_KEY in your .env file.";
  }

  try {
    const fullPrompt = `You are CivicBot, an AI legal assistant specializing in Indian law and civic procedures. Provide concise and accurate information. User query: ${userMessage}`;
    
    const messages = [
      {
        "role": "user",
        "content": fullPrompt
      }
    ];

    return await makeRateLimitedRequest<string>(() => makeOpenRouterCall(messages));

  } catch (error: any) {
    console.error('Error calling OpenRouter API:', error);
    
    if (error.message.includes('Rate limited')) {
      return 'I\'m currently receiving too many requests. Please wait a moment and try again.';
    }
    
    return 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment.';
  }
}