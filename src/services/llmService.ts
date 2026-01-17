export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

// Configuration for the LLM service
const API_KEY = '.storefront.e8b52f7a1d687d8fcf2016d3070fc947beb9f716ac8f8d703c99b0a79a537f53'; 
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
      
      // Offline Fallback Mechanism
      const lastUserMessage = messages[messages.length - 1]?.content || '';
      const offlineResponse = this.getOfflineResponse(lastUserMessage);
      
      if (offlineResponse) {
        // Return the preset answer with a small offline indicator
        return `${offlineResponse}\n\n[OFFLINE MODE: Using local cached knowledge]`;
      }

      throw new Error('Failed to generate response from AI service.');
    }
  }

  private getOfflineResponse(query: string): string | null {
    // Simple keyword matching for the hackathon demo
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('flood')) {
      return "DURING A FLOOD:\n• Move to higher ground immediately.\n• Do not walk, swim, or drive through flood waters. Turn Around, Don't Drown!\n• Evacuate if told to do so by authorities.\n• Disconnect electrical appliances if safe to do so.\n• Keep your emergency kit close.";
    }
    
    if (lowerQuery.includes('evacuation') || lowerQuery.includes('route')) {
      return "NEAREST EVACUATION ROUTE:\n• Accessing stored offline map data...\n• The nearest designated shelter is the City Community Center (1.2km North).\n• Head North on Main St, turn Left on 4th Ave.\n• Follow the green emergency signs.";
    }
    
    if (lowerQuery.includes('first aid') || lowerQuery.includes('injury')) {
      return "BASIC FIRST AID:\n• Bleeding: Apply direct pressure with a clean cloth.\n• Burns: Cool with running cool tap water for at least 10 minutes.\n• Fractures: Immobilize the injured area. Do not try to realign the bone.\n• CPR: If unconscious and not breathing, start chest compressions immediately.\n• SEEK PROFESSIONAL MEDICAL HELP ASAP.";
    }
    
    if (lowerQuery.includes('purify') || lowerQuery.includes('water')) {
      return "HOW TO PURIFY WATER:\n1. Boiling: Bring water to a rolling boil for 1 minute.\n2. Disinfection: Use 8 drops of regular household bleach (unscented) per gallon of water. Stir and let sit for 30 minutes.\n3. Filtration: If no other option, filter through a clean cloth, then boil or disinfect.";
    }

    if (lowerQuery.includes('earthquake')) {
      return "EARTHQUAKE SAFETY:\n• DROP, COVER, and HOLD ON.\n• Stay indoors until the shaking stops.\n• Stay away from glass, windows, outside doors and walls.\n• If outside, move away from buildings, streetlights, and utility wires.\n• Use stairs, not elevators.";
    }

    if (lowerQuery.includes('kit') || lowerQuery.includes('checklist')) {
      return "EMERGENCY KIT CHECKLIST:\n• Water (1 gal/person/day for 3 days)\n• Non-perishable food (3-day supply)\n• Flashlight & extra batteries\n• First aid kit & medications\n• Whistle (to signal for help)\n• Dust mask, plastic sheeting, & duct tape\n• Local maps\n• Cell phone with charger/backup battery";
    }

    if (lowerQuery.includes('power') || lowerQuery.includes('outage')) {
      return "POWER OUTAGE TIPS:\n• Keep freezers and refrigerators closed.\n• Use flashlights, not candles (fire risk).\n• Disconnect appliances to avoid surges when power returns.\n• If using a generator, keep it OUTSIDE and away from windows (carbon monoxide risk).\n• Check on neighbors, specially the elderly.";
    }

    return "OFFLINE MODE: Connection lost.\n\nI have limited local data available. Please ask about:\n• Flood safety & Evacuation\n• First aid & Water purification\n• Earthquake safety\n• Emergency kit checklist\n• Power outage tips\n\n(Reconnect to internet for full AI capabilities)";
  }
}

export const llmService = new LLMService();
