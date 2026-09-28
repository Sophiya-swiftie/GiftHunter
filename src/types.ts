export interface RecipientProfile {
  relationship: string;
  age: string;
  hobbies: string[];
  quirks: string;
  occasion: string;
  budget: string;
  currency: string;
  vibe: string;
  customPrompt?: string;
}

export interface EcommerceLinks {
  amazon: string;
  googleShopping: string;
  etsy: string;
  flipkart: string;
}

export interface GiftItem {
  id: string;
  title: string;
  whyPerfect: string;
  priceBracketCheck: string;
  searchQuery: string;
  ecommerceLinks: EcommerceLinks;
}

export interface HuntResult {
  rawMarkdown: string;
  intentAnalysis: string;
  subcultures: string[];
  searchStrategy: string[];
  recommendations: GiftItem[];
  budget: string;
  promptUsed: string;
}

export interface SavedGiftItem extends GiftItem {
  recipientName: string;
  savedAt: number;
}
