import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, integer, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const natalCharts = pgTable("natal_charts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  birthDate: text("birth_date").notNull(), // YYYY-MM-DD format
  birthTime: text("birth_time").notNull(), // HH:MM format
  birthLocation: text("birth_location").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  timezone: text("timezone").notNull(),
  houseSystem: text("house_system").notNull().default("placidus"),
  orbSize: text("orb_size").notNull().default("normal"),
  planetaryData: json("planetary_data"), // Calculated planetary positions
  housesData: json("houses_data"), // House cusps and positions
  aspectsData: json("aspects_data"), // Calculated aspects
  luckRemedies: json("luck_remedies"), // Personalized luck remedies
  createdAt: timestamp("created_at").defaultNow(),
});

// Zodiac sign type
export const zodiacSigns = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
] as const;

export type ZodiacSign = typeof zodiacSigns[number];

// Planet data structure
export interface PlanetPosition {
  name: string;
  symbol: string;
  longitude: number; // Ecliptic longitude in degrees
  latitude: number;  // Ecliptic latitude in degrees
  distance: number;  // Distance from Earth
  zodiacSign: ZodiacSign;
  zodiacDegree: number; // Degree within the sign (0-29.99)
  house: number; // House position (1-12)
  isRetrograde: boolean;
}

// House data structure
export interface HousePosition {
  number: number; // House number (1-12)
  cusp: number;   // Cusp longitude in degrees
  zodiacSign: ZodiacSign;
  zodiacDegree: number;
}

// Aspect data structure
export interface AspectData {
  planet1: string;
  planet2: string;
  aspectType: "conjunction" | "opposition" | "trine" | "square" | "sextile" | "semisquare" | "sesquiquadrate" | "quincunx";
  orb: number; // Degrees from exact aspect
  isApplying: boolean; // Whether the aspect is applying or separating
}

// Birth data input schema
export const birthDataSchema = z.object({
  name: z.string().min(1, "Name is required"),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  birthTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  birthLocation: z.string().min(1, "Birth location is required"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  timezone: z.string(),
  houseSystem: z.enum(["placidus", "koch", "equal", "whole"]).default("placidus"),
  orbSize: z.enum(["tight", "normal", "wide"]).default("normal"),
});

// Location search result schema
export const locationResultSchema = z.object({
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  country: z.string(),
  admin1: z.string().optional(), // State/province
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertNatalChartSchema = createInsertSchema(natalCharts).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type NatalChart = typeof natalCharts.$inferSelect;
export type InsertNatalChart = z.infer<typeof insertNatalChartSchema>;
export type BirthData = z.infer<typeof birthDataSchema>;
export type LocationResult = z.infer<typeof locationResultSchema>;

// Life advice system types
export type AdviceCategory = "finance" | "partner" | "career" | "health";

// Condition types for advice rules
export interface PlacementCondition {
  type: "placement";
  planet: string;
  house?: number;
  sign?: ZodiacSign;
}

export interface AspectCondition {
  type: "aspect";
  planet1: string;
  planet2: string;
  aspectType: "conjunction" | "opposition" | "trine" | "square" | "sextile" | "harmonious" | "challenging";
  maxOrb?: number;
}

export interface HouseEmphasisCondition {
  type: "houseEmphasis";
  house: number;
  minPlanets: number;
}

export interface RetrogradeCondition {
  type: "retrograde";
  planet: string;
  isRetrograde: boolean;
}

export interface RulerPlacementCondition {
  type: "rulerPlacement";
  houseRuled: number;
  rulerHouse?: number;
  rulerSign?: ZodiacSign;
}

export interface SignEmphasisCondition {
  type: "signEmphasis";
  sign: ZodiacSign;
  minPlanets: number;
}

export interface ElementBalanceCondition {
  type: "elementBalance";
  element: "fire" | "earth" | "air" | "water";
  minPercentage: number;
}

export type Condition = 
  | PlacementCondition 
  | AspectCondition 
  | HouseEmphasisCondition 
  | RetrogradeCondition 
  | RulerPlacementCondition 
  | SignEmphasisCondition 
  | ElementBalanceCondition;

// Advice rule structure
export interface AdviceRule {
  id: string;
  category: AdviceCategory;
  conditions: Condition[];
  effect: "positive" | "challenge" | "neutral";
  weight: number; // 1-5, higher means more important
  advice: string;
  tags?: string[];
}

// Advice result item
export interface AdviceItem {
  advice: string;
  effect: "positive" | "challenge" | "neutral";
  weight: number;
  evidence: string[];
}

// Advice result for a category
export interface AdviceResult {
  category: AdviceCategory;
  score: number; // 0-100, calculated from weighted positive/negative effects
  items: AdviceItem[];
}

// Luck remedy data structure
export interface LuckRemedy {
  title: string;
  description: string;
  practices: string[];
  color: string;
  iconType: "gift" | "star" | "sparkles" | "sun" | "moon";
}
