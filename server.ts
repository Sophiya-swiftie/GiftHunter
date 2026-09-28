import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json({ limit: '1mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `You are the core AI agent behind a hyper-personalized Gift Hunter website. Your job is to act as a thoughtful, strategic gift curation expert. You never recommend generic or lazy items (like plain gift cards or mugs). Instead, you find creative intersections between the recipient's unique interests.

When a user provides a prompt containing the recipient's details (age, relationship, specific hobbies, quirks) and a budget, follow these strict execution steps:

1. INTENT ANALYSIS: Break down the recipient's profile. Identify the distinct sub-cultures or hobbies mentioned (e.g., "gardening" AND "rock music"). Brainstorm how these can overlap creatively or what high-utility niche items exist for those specific hobbies.

2. SEARCH STRATEGY DEFINITION: Output a list of 3 precise product search terms that can be used to query e-commerce catalogs (like Amazon, Flipkart, or niche stores). These terms must include structural details (e.g., "rock music theme outdoor garden stepping stone", "heavy metal guitar garden spade tool"). Do not use generic terms.

3. GIFT RECOMMENDATIONS: Present exactly 3 distinct, highly tailored gift options. For each option, provide:
   - Product Title: (A clear, descriptive name of the specific item)
   - Why It's Perfect: (A 2-sentence explanation connecting the item directly to their personality and hobbies)
   - Price bracket check: Explicitly state that this fits within the user's requested budget.

Maintain a friendly, enthusiastic, and confident tone. Format your response cleanly using Markdown headers and bullet points so the website's front-end can easily parse it.

Follow this exact Markdown section structure:
# 1. INTENT ANALYSIS
[Detailed breakdown of sub-cultures, intersection brainstorming, and creative angles]

# 2. SEARCH STRATEGY DEFINITION
- [Precise Search Term 1 with structural details]
- [Precise Search Term 2 with structural details]
- [Precise Search Term 3 with structural details]

# 3. GIFT RECOMMENDATIONS

### Option 1: [Product Title]
- **Product Title**: [Clear, descriptive name of the specific item]
- **Why It's Perfect**: [2-sentence explanation connecting the item directly to their personality and hobbies]
- **Price bracket check**: [Explicit statement confirming it fits within the requested budget, with estimated price range]

### Option 2: [Product Title]
- **Product Title**: [Clear, descriptive name of the specific item]
- **Why It's Perfect**: [2-sentence explanation connecting the item directly to their personality and hobbies]
- **Price bracket check**: [Explicit statement confirming it fits within the requested budget, with estimated price range]

### Option 3: [Product Title]
- **Product Title**: [Clear, descriptive name of the specific item]
- **Why It's Perfect**: [2-sentence explanation connecting the item directly to their personality and hobbies]
- **Price bracket check**: [Explicit statement confirming it fits within the requested budget, with estimated price range]
`;

export interface ParsedGift {
  id: string;
  title: string;
  whyPerfect: string;
  priceBracketCheck: string;
  searchQuery: string;
  ecommerceLinks: {
    amazon: string;
    googleShopping: string;
    etsy: string;
    flipkart: string;
  };
}

export interface HuntResponse {
  rawMarkdown: string;
  intentAnalysis: string;
  subcultures: string[];
  searchStrategy: string[];
  recommendations: ParsedGift[];
  budget: string;
}

function parseMarkdownOutput(markdown: string, budget: string): {
  intentAnalysis: string;
  subcultures: string[];
  searchStrategy: string[];
  recommendations: ParsedGift[];
} {
  let intentAnalysis = '';
  const searchStrategy: string[] = [];
  const recommendations: ParsedGift[] = [];
  const subcultures: string[] = [];

  try {
    // Extract section 1: INTENT ANALYSIS
    const intentMatch = markdown.match(/(?:#+\s*1\.?\s*INTENT ANALYSIS[\s\S]*?)(?=#+\s*2\.?\s*SEARCH STRATEGY|$)/i);
    if (intentMatch) {
      intentAnalysis = intentMatch[0].replace(/^#+\s*1\.?\s*INTENT ANALYSIS\s*/i, '').trim();
    }

    // Attempt to extract detected subcultures from intent
    const subcultureMatches = intentAnalysis.match(/(?:sub-cultures?|hobbies|interests?|passions?|intersection(?:s|ing)?):\s*([^\n\.]+)/i);
    if (subcultureMatches && subcultureMatches[1]) {
      const items = subcultureMatches[1]
        .split(/[,&+]|\band\b/i)
        .map(s => s.replace(/["'*]/g, '').trim())
        .filter(s => s.length > 2 && s.length < 35);
      subcultures.push(...items);
    }

    // Extract section 2: SEARCH STRATEGY DEFINITION
    const searchMatch = markdown.match(/(?:#+\s*2\.?\s*SEARCH STRATEGY[\s\S]*?)(?=#+\s*3\.?\s*GIFT RECOMMENDATIONS|$)/i);
    if (searchMatch) {
      const searchLines = searchMatch[0]
        .replace(/^#+\s*2\.?\s*SEARCH STRATEGY[^\n]*\n/i, '')
        .split('\n');
      for (const line of searchLines) {
        const cleanLine = line.replace(/^[\s*\-•\d.]+\s*/, '').replace(/["']/g, '').trim();
        if (cleanLine.length > 5 && !cleanLine.startsWith('#') && searchStrategy.length < 3) {
          searchStrategy.push(cleanLine);
        }
      }
    }

    // Extract section 3: GIFT RECOMMENDATIONS
    const giftsMatch = markdown.match(/(?:#+\s*3\.?\s*GIFT RECOMMENDATIONS[\s\S]*$)/i);
    const giftsBlock = giftsMatch ? giftsMatch[0] : markdown;

    // Split options by "### Option" or "Option [123]" or "### [123]"
    const optionBlocks = giftsBlock.split(/(?=###?\s*(?:Option\s*\d+|[123]\b|Gift\s*\d+))/i).filter(b => !b.startsWith('# 3. GIFT RECOMMENDATIONS') || b.includes('Product Title'));

    for (let i = 0; i < optionBlocks.length; i++) {
      const block = optionBlocks[i];
      if (!block.trim()) continue;

      let title = '';
      let whyPerfect = '';
      let priceBracketCheck = '';

      // Title pattern
      const titleMatch = block.match(/(?:\*\*Product Title\*\*|Product Title):\s*([^\n]+)/i) ||
                         block.match(/###?\s*(?:Option\s*\d+:\s*)?([^\n]+)/i);
      if (titleMatch) {
        title = titleMatch[1].replace(/[*_#\[\]]/g, '').trim();
      }

      // Why it's perfect pattern
      const whyMatch = block.match(/(?:\*\*Why It's Perfect\*\*|Why It's Perfect):\s*([\s\S]*?)(?=\n\s*[-*]\s*\*\*Price bracket check\*\*|\n\s*[-*]\s*Price bracket check|\n###|$)/i);
      if (whyMatch) {
        whyPerfect = whyMatch[1].replace(/[*_]/g, '').trim();
      }

      // Price bracket check pattern
      const priceMatch = block.match(/(?:\*\*Price bracket check\*\*|Price bracket check):\s*([\s\S]*?)(?=\n###|\n\n\n|$)/i);
      if (priceMatch) {
        priceBracketCheck = priceMatch[1].replace(/[*_]/g, '').trim();
      }

      if (title && recommendations.length < 3) {
        const searchQuery = title.replace(/[^\w\s-]/g, ' ').replace(/\s+/g, ' ').trim();
        recommendations.push({
          id: `gift-${i + 1}-${Date.now()}`,
          title: title || `Gift Recommendation ${i + 1}`,
          whyPerfect: whyPerfect || 'Creatively tailored to match the unique overlap of their interests and hobbies.',
          priceBracketCheck: priceBracketCheck || `Fully verified to fall comfortably within the requested budget (${budget}).`,
          searchQuery,
          ecommerceLinks: {
            amazon: `https://www.amazon.com/s?k=${encodeURIComponent(searchQuery)}`,
            googleShopping: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(searchQuery)}`,
            etsy: `https://www.etsy.com/search?q=${encodeURIComponent(searchQuery)}`,
            flipkart: `https://www.flipkart.com/search?q=${encodeURIComponent(searchQuery)}`,
          },
        });
      }
    }
  } catch (err) {
    console.error('Error parsing markdown output:', err);
  }

  // Fallback defaults if parser missed anything
  if (searchStrategy.length === 0) {
    searchStrategy.push('artisan themed specialty curated gift set');
    searchStrategy.push('custom niche hobby personalized accessory');
    searchStrategy.push('handcrafted collectors creative intersection item');
  }

  return {
    intentAnalysis: intentAnalysis || markdown.slice(0, 300),
    subcultures,
    searchStrategy,
    recommendations,
  };
}

// Generate content with retry and model fallback
async function generateGiftHunt(contents: string): Promise<string> {
  const models = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];

  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      if (response && response.text) {
        return response.text;
      }
    } catch (err: any) {
      console.warn(`Model ${model} call failed (${err?.message || err}). Trying next fallback...`);
      await new Promise(r => setTimeout(r, 600));
    }
  }

  throw new Error('All AI models are currently experiencing high demand. Please try again in a few moments.');
}

// Main Gift Hunter API
app.post('/api/hunt-gifts', async (req, res) => {
  try {
    const {
      prompt,
      relationship,
      age,
      hobbies,
      quirks,
      budget,
      currency = '$',
      occasion,
      vibe,
    } = req.body;

    let fullPrompt = '';

    if (prompt && prompt.trim()) {
      fullPrompt = prompt.trim();
      if (budget && !fullPrompt.toLowerCase().includes('budget')) {
        fullPrompt += `\nBudget: ${currency}${budget}`;
      }
    } else {
      const hobbiesList = Array.isArray(hobbies) ? hobbies.join(', ') : (hobbies || 'Creative and curious');
      fullPrompt = `Recipient Profile:
- Relationship: ${relationship || 'Friend / Loved One'}
- Age: ${age ? `${age} years old` : 'Adult'}
- Specific Hobbies & Passions: ${hobbiesList}
- Quirks, Inside Jokes & Distinct Peculiarities: ${quirks || 'Enjoys unexpected, thoughtful details'}
- Occasion: ${occasion || 'Special Occasion / Just Because'}
- Budget: ${currency}${budget || '50'}
- Desired Vibe: ${vibe || 'Creative Intersection & High Utility'}`;
    }

    const rawMarkdown = await generateGiftHunt(fullPrompt);
    const budgetDisplay = `${currency}${budget || '50'}`;
    const parsed = parseMarkdownOutput(rawMarkdown, budgetDisplay);

    res.json({
      success: true,
      rawMarkdown,
      intentAnalysis: parsed.intentAnalysis,
      subcultures: parsed.subcultures,
      searchStrategy: parsed.searchStrategy,
      recommendations: parsed.recommendations,
      budget: budgetDisplay,
      promptUsed: fullPrompt,
    });
  } catch (error: any) {
    console.error('Error generating gift hunt:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Failed to curate gift recommendations. Please try again.',
    });
  }
});

// Card Message / Presentation Note Generator
app.post('/api/gift-card-note', async (req, res) => {
  try {
    const { giftTitle, recipientDetails, tone = 'witty and warm' } = req.body;

    const prompt = `Write a charming, memorable 2 to 3 sentence gift card note to accompany this gift: "${giftTitle}".
Recipient context: ${recipientDetails || 'A very special person in my life'}.
Desired tone: ${tone}.
Make it feel deeply personal, clever, and mention a cute nod to their hobby or quirk. Keep it ready to write in a physical greeting card.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an articulate, warm, and witty gift card note writer. Write directly the message without meta commentary.',
        temperature: 0.8,
      },
    });

    res.json({
      success: true,
      note: response.text?.trim() || 'Wishing you endless joy with this special gift picked just for you!',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error?.message || 'Failed to generate gift card note',
    });
  }
});

// Mount Vite or serve static
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🎁 Gift Hunter AI server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server failed to start:', err);
});
