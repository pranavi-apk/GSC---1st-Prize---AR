export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

// Configuration for the LLM service
const API_KEY = '.storefront.acc4502fcace73f28306d5e7cc1799d0ff98ebaf1a4b724293e4b202e7888645'; 
// Use local proxy to avoid CORS
const API_ENDPOINT = '/api/ai/chat/completions';

const SYSTEM_PROMPT = `You are the Resilient360 AI Assistant, a specialized AI for disaster response and emergency management.
Your goal is to provide accurate, calm, and safety-focused advice to users who may be in distress.

GUIDELINES:
1. PRIORITIZE SAFETY: Always advise on immediate safety steps first (e.g., higher ground during floods).
2. BE CONCISE: Emergency situations require quick reading. Use bullet points and short sentences.
3. DIRECT TO AUTHORITIES: For life-threatening situations, always instruct the user to contact local emergency services immediately.
4. BE EMPATHETIC BUT PROFESSIONAL: Acknowledge distress but remain focused on actionable advice.
5. CONTEXT AWARE: Assume the user might be in Jakarta or surrounding areas (based on the app's context) if location isn't specified, but ask if unsure.
6. NO MARKDOWN: Output strictly plain text. Do NOT use markdown formatting such as **bold**, *italics*, # headers, or [links](). Use capitalization for emphasis if needed.

Do NOT provide medical diagnoses. Provide first aid instructions but urge professional medical help.`;

export class LLMService {
  private apiKey: string;
  private endpoint: string;

  constructor(apiKey: string = API_KEY, endpoint: string = API_ENDPOINT) {
    this.apiKey = apiKey;
    this.endpoint = endpoint;
  }

  async generateResponse(messages: Message[]): Promise<string> {
    try {
      // Prepend the system prompt to the messages
      const fullHistory = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ];

      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: fullHistory,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `API Error: ${response.status} ${response.statusText} - ${JSON.stringify(
            errorData
          )}`
        );
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'No response generated.';
    } catch (error) {
      console.error('LLMService Error:', error);
      throw new Error('Failed to generate response from AI service.');
    }
  }
}

export const llmService = new LLMService();
