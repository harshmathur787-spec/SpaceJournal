import { AdviceRule } from "./schema";

// Comprehensive astrological advice rules for the four life categories
export const adviceRules: AdviceRule[] = [
  // ===== FINANCIAL LIFE RULES =====
  {
    id: "finance-venus-2nd",
    category: "finance",
    conditions: [{ type: "placement", planet: "Venus", house: 2 }],
    effect: "positive",
    weight: 4,
    advice: "You have natural talent for attracting money and appreciating beautiful things. Focus on careers involving luxury goods, art, or beauty industries.",
    tags: ["venus", "2nd-house", "attraction"]
  },
  {
    id: "finance-jupiter-2nd",
    category: "finance", 
    conditions: [{ type: "placement", planet: "Jupiter", house: 2 }],
    effect: "positive",
    weight: 5,
    advice: "Jupiter in your money house brings financial luck and expansion. You're likely to prosper through generosity, education, or foreign connections.",
    tags: ["jupiter", "2nd-house", "expansion"]
  },
  {
    id: "finance-saturn-2nd",
    category: "finance",
    conditions: [{ type: "placement", planet: "Saturn", house: 2 }],
    effect: "challenge",
    weight: 3,
    advice: "Saturn in your money house requires disciplined financial planning. Build wealth slowly through consistent saving and conservative investments.",
    tags: ["saturn", "2nd-house", "discipline"]
  },
  {
    id: "finance-10th-house-emphasis",
    category: "finance",
    conditions: [{ type: "houseEmphasis", house: 10, minPlanets: 2 }],
    effect: "positive",
    weight: 4,
    advice: "Strong career house indicates financial success through professional achievement. Focus on building your reputation and status.",
    tags: ["10th-house", "career", "status"]
  },
  {
    id: "finance-mars-8th",
    category: "finance",
    conditions: [{ type: "placement", planet: "Mars", house: 8 }],
    effect: "neutral",
    weight: 3,
    advice: "Mars in the 8th house suggests financial transformation through joint resources. Be cautious with investments and debts.",
    tags: ["mars", "8th-house", "transformation"]
  },
  {
    id: "finance-earth-emphasis",
    category: "finance",
    conditions: [{ type: "elementBalance", element: "earth", minPercentage: 40 }],
    effect: "positive",
    weight: 3,
    advice: "Strong Earth element gives you practical financial instincts. Trust your ability to build lasting wealth through tangible investments.",
    tags: ["earth", "practical", "stability"]
  },

  // ===== LIFE PARTNER RULES =====
  {
    id: "partner-venus-7th",
    category: "partner",
    conditions: [{ type: "placement", planet: "Venus", house: 7 }],
    effect: "positive",
    weight: 5,
    advice: "Venus in your partnership house brings harmonious relationships. You attract loving partners and have natural relationship skills.",
    tags: ["venus", "7th-house", "harmony"]
  },
  {
    id: "partner-venus-libra",
    category: "partner",
    conditions: [{ type: "placement", planet: "Venus", sign: "libra" }],
    effect: "positive",
    weight: 4,
    advice: "Venus in Libra gives you refined relationship ideals. You seek balance, beauty, and fairness in partnerships.",
    tags: ["venus", "libra", "balance"]
  },
  {
    id: "partner-mars-venus-harmonious",
    category: "partner",
    conditions: [{ type: "aspect", planet1: "Mars", planet2: "Venus", aspectType: "harmonious" }],
    effect: "positive",
    weight: 4,
    advice: "Harmonious Mars-Venus aspect creates magnetic attraction and balanced passion. Your romantic nature is well-integrated.",
    tags: ["mars", "venus", "attraction", "balance"]
  },
  {
    id: "partner-saturn-7th",
    category: "partner",
    conditions: [{ type: "placement", planet: "Saturn", house: 7 }],
    effect: "challenge",
    weight: 3,
    advice: "Saturn in relationships requires patience and commitment. Your partnerships may start later but tend to be stable and long-lasting.",
    tags: ["saturn", "7th-house", "commitment"]
  },
  {
    id: "partner-moon-cancer",
    category: "partner",
    conditions: [{ type: "placement", planet: "Moon", sign: "cancer" }],
    effect: "positive",
    weight: 3,
    advice: "Moon in Cancer indicates deep emotional nurturing needs. You seek security and family-oriented partners.",
    tags: ["moon", "cancer", "nurturing"]
  },
  {
    id: "partner-uranus-7th",
    category: "partner",
    conditions: [{ type: "placement", planet: "Uranus", house: 7 }],
    effect: "challenge",
    weight: 3,
    advice: "Uranus in partnerships brings unexpected changes. You need freedom and may attract unconventional relationships.",
    tags: ["uranus", "7th-house", "freedom"]
  },

  // ===== CAREER RULES =====
  {
    id: "career-sun-10th",
    category: "career",
    conditions: [{ type: "placement", planet: "Sun", house: 10 }],
    effect: "positive",
    weight: 5,
    advice: "Sun in your career house indicates natural leadership abilities. You're meant to shine in public roles and positions of authority.",
    tags: ["sun", "10th-house", "leadership"]
  },
  {
    id: "career-mars-10th",
    category: "career",
    conditions: [{ type: "placement", planet: "Mars", house: 10 }],
    effect: "positive",
    weight: 4,
    advice: "Mars in your career house brings drive and ambition. You excel in competitive fields and action-oriented professions.",
    tags: ["mars", "10th-house", "ambition"]
  },
  {
    id: "career-mercury-gemini",
    category: "career",
    conditions: [{ type: "placement", planet: "Mercury", sign: "gemini" }],
    effect: "positive",
    weight: 3,
    advice: "Mercury in Gemini enhances communication skills. Consider careers in writing, teaching, media, or technology.",
    tags: ["mercury", "gemini", "communication"]
  },
  {
    id: "career-jupiter-10th",
    category: "career",
    conditions: [{ type: "placement", planet: "Jupiter", house: 10 }],
    effect: "positive",
    weight: 4,
    advice: "Jupiter in career house brings professional growth and recognition. You may excel in education, law, or international business.",
    tags: ["jupiter", "10th-house", "growth"]
  },
  {
    id: "career-saturn-sun-challenging",
    category: "career",
    conditions: [{ type: "aspect", planet1: "Saturn", planet2: "Sun", aspectType: "challenging" }],
    effect: "challenge",
    weight: 3,
    advice: "Challenging Saturn-Sun aspect requires proving your worth through hard work. Success comes through persistence and overcoming obstacles.",
    tags: ["saturn", "sun", "obstacles", "persistence"]
  },
  {
    id: "career-6th-house-emphasis",
    category: "career",
    conditions: [{ type: "houseEmphasis", house: 6, minPlanets: 2 }],
    effect: "positive",
    weight: 3,
    advice: "Strong 6th house indicates success through service and attention to detail. You excel in health, service, or analytical fields.",
    tags: ["6th-house", "service", "detail"]
  },

  // ===== HEALTH RULES =====
  {
    id: "health-mars-1st",
    category: "health",
    conditions: [{ type: "placement", planet: "Mars", house: 1 }],
    effect: "positive",
    weight: 4,
    advice: "Mars in your 1st house gives strong vitality and physical energy. You benefit from regular exercise and physical activity.",
    tags: ["mars", "1st-house", "vitality"]
  },
  {
    id: "health-moon-6th",
    category: "health",
    conditions: [{ type: "placement", planet: "Moon", house: 6 }],
    effect: "neutral",
    weight: 3,
    advice: "Moon in health house makes you sensitive to daily routines. Your health fluctuates with emotional state - manage stress carefully.",
    tags: ["moon", "6th-house", "routine"]
  },
  {
    id: "health-saturn-mars-challenging",
    category: "health",
    conditions: [{ type: "aspect", planet1: "Saturn", planet2: "Mars", aspectType: "challenging" }],
    effect: "challenge",
    weight: 3,
    advice: "Challenging Saturn-Mars aspect can create tension in bones and muscles. Focus on gradual exercise and avoid overexertion.",
    tags: ["saturn", "mars", "tension", "bones"]
  },
  {
    id: "health-virgo-emphasis",
    category: "health",
    conditions: [{ type: "signEmphasis", sign: "virgo", minPlanets: 2 }],
    effect: "positive",
    weight: 3,
    advice: "Strong Virgo influence gives health consciousness and attention to nutrition. You benefit from natural and holistic approaches.",
    tags: ["virgo", "nutrition", "holistic"]
  },
  {
    id: "health-water-emphasis",
    category: "health",
    conditions: [{ type: "elementBalance", element: "water", minPercentage: 40 }],
    effect: "neutral",
    weight: 2,
    advice: "Strong Water element makes you emotionally sensitive. Your health is closely tied to emotional well-being and stress levels.",
    tags: ["water", "emotions", "stress"]
  },
  {
    id: "health-jupiter-6th",
    category: "health",
    conditions: [{ type: "placement", planet: "Jupiter", house: 6 }],
    effect: "positive",
    weight: 3,
    advice: "Jupiter in health house generally protects your well-being. Watch for overindulgence and maintain moderation in diet.",
    tags: ["jupiter", "6th-house", "protection"]
  }
];

// Helper function to get rules by category
export function getRulesByCategory(category: string): AdviceRule[] {
  return adviceRules.filter(rule => rule.category === category);
}

// Export the full rules array as default
export default adviceRules;