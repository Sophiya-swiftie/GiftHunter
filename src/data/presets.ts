import { RecipientProfile } from '../types';

export interface PresetProfile {
  id: string;
  name: string;
  avatar: string;
  tagline: string;
  intersection: string;
  profile: RecipientProfile;
}

export const PRESET_PROFILES: PresetProfile[] = [
  {
    id: 'metal-gardener',
    name: 'The Gothic Botanist',
    avatar: '🪴⚡',
    tagline: '28yo Sister • Heavy Metal & Succulent Propagation',
    intersection: 'Black Metal ✕ Exotic Flora',
    profile: {
      relationship: 'Sister',
      age: '28',
      hobbies: ['Succulent & Rare Houseplant Propagation', 'Heavy Metal & Doom Rock Shows', 'Vintage Thrift Fashion'],
      quirks: 'Names her carnivorous pitcher plants after 90s metal band frontmen; wears all-black gardening overalls.',
      occasion: 'Birthday',
      budget: '45',
      currency: '$',
      vibe: 'Bold Creative Mashup',
      customPrompt: 'My 28-year-old sister is deeply into black metal and rare succulent propagation. She loves gloomy dark aesthetic, indoor plant care, and live concerts. Budget is around $45.',
    },
  },
  {
    id: 'keyboard-barista',
    name: 'The Mechanical Barista',
    avatar: '☕⌨️',
    tagline: '34yo Husband • Specialty Espresso & Custom Keyboards',
    intersection: 'Specialty Coffee ✕ Mechanical Keyboards',
    profile: {
      relationship: 'Husband',
      age: '34',
      hobbies: ['Third-Wave Espresso Extraction (WDT, Puck Prep)', 'Custom Mechanical Keyboards (Lubing switches, solder builds)', 'Minimalist Desk Setups'],
      quirks: 'Measures coffee bean weight to within 0.05 grams and argues about tactile vs linear switch acoustics on Reddit.',
      occasion: 'Anniversary',
      budget: '75',
      currency: '$',
      vibe: 'High-Utility Niche Tool',
      customPrompt: 'My 34-year-old husband is obsessive about dialing in specialty espresso with precision scales and builds custom mechanical keyboards by hand. Budget is $75.',
    },
  },
  {
    id: 'cyberpunk-baker',
    name: 'The Cyberpunk Sourdough Baker',
    avatar: '🥖🤖',
    tagline: '24yo Roommate • Wild Yeast Fermentation & 80s Anime',
    intersection: 'Sourdough Fermentation ✕ Retro Sci-Fi',
    profile: {
      relationship: 'Roommate',
      age: '24',
      hobbies: ['Artisan Sourdough Baking', 'Vintage Cyberpunk & 80s Mecha Anime (Akira, Ghost in the Shell)', 'Lo-fi Synth Music'],
      quirks: 'Has a 4-year-old sourdough starter named "Tetsuo" and scores intricate geometric futuristic line-art into loaf crusts before baking.',
      occasion: 'Housewarming',
      budget: '40',
      currency: '$',
      vibe: 'Playful & Unexpected',
      customPrompt: 'Looking for a gift for my 24-year-old roommate who spends every Sunday baking artisan sourdough loaves and watches 1980s retro sci-fi and cyberpunk anime. Budget: $40.',
    },
  },
  {
    id: 'trail-birder',
    name: 'The Ultra-Trail Birdwatcher',
    avatar: '🏃‍♂️🦅',
    tagline: '56yo Dad • 50K Trail Ultra-Running & Raptor Watching',
    intersection: 'Ultra-Marathon Running ✕ Ornithology',
    profile: {
      relationship: 'Dad',
      age: '56',
      hobbies: ['Ultra-Distance Mountain Trail Running', 'Wild Bird Watching & Raptor ID', 'Ultralight Hiking Gear'],
      quirks: 'Can identify a red-tailed hawk by its silhouette while maintaining a 5-minute per km uphill running pace.',
      occasion: "Father's Day",
      budget: '65',
      currency: '$',
      vibe: 'High-Utility Niche Tool',
      customPrompt: 'My 56-year-old Dad runs 50k mountain ultramarathons and is an avid amateur ornithologist who tracks wild hawks and owls. Budget: $65.',
    },
  },
  {
    id: 'rpg-mixologist',
    name: 'The Tabletop Mixologist',
    avatar: '🎲🍸',
    tagline: '30yo Best Friend • Dungeons & Dragons & Craft Bitters',
    intersection: 'Tabletop RPGs ✕ Speakeasy Craft Cocktails',
    profile: {
      relationship: 'Best Friend',
      age: '30',
      hobbies: ['Dungeon Master for Tabletop RPGs (D&D 5e)', 'Home Speakeasy Cocktails & Foraged Bitters', 'Dice Collecting'],
      quirks: 'Invents custom cocktail recipes for every magical potion encountered in their weekly game campaign.',
      occasion: 'Holiday',
      budget: '50',
      currency: '$',
      vibe: 'Bold Creative Mashup',
      customPrompt: 'My best friend (30) is our weekly D&D Dungeon Master and also loves making artisanal speakeasy cocktails with smoked wood chips and bitters. Budget: $50.',
    },
  },
];

export const POPULAR_HOBBIES = [
  'Succulent & Houseplants',
  'Specialty Espresso & Coffee',
  'Mechanical Keyboards',
  'Board Games & D&D',
  'Baking & Sourdough',
  'Vintage Vinyl Records',
  'Rock & Metal Music',
  'Trail Running & Hiking',
  'Bird Watching & Wildlife',
  'Film Photography',
  'Woodworking & Carving',
  'Japanese Stationery & Fountain Pens',
  'Bouldering & Rock Climbing',
  'Sci-Fi & Cyberpunk',
  'Craft Beer & Cocktails',
  'Ceramics & Pottery',
  'Stargazing & Astronomy',
  'Cat & Dog Training',
];

export const VIBE_OPTIONS = [
  { id: 'Creative Intersection & High Utility', label: 'Creative Intersection & High Utility', desc: 'Practical gear with an imaginative overlap' },
  { id: 'Bold Mashup & Conversation Starter', label: 'Bold Mashup & Conversation Starter', desc: 'Unexpected hybrid items that turn heads' },
  { id: 'Artisan / Niche Specialist', label: 'Artisan / Niche Specialist', desc: 'Deep-cut enthusiast products only true insiders know' },
  { id: 'Sentimental with a Twist', label: 'Sentimental with a Twist', desc: 'Heartfelt nod to an inside joke or shared quirk' },
];
