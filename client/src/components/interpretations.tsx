import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Star, Moon, ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import type { NatalChart, PlanetPosition } from "@shared/schema";

// User's personalized interpretations system
function signPersonality(sign: string){
  const map: Record<string, string> = {
    Aries: "dynamic, pioneering and direct. You prefer action and quick decisions.",
    Taurus: "steady, patient and value security. You seek comfort and practical results.",
    Gemini: "curious, communicative and adaptable. Ideas and connections energize you.",
    Cancer: "sensitive, nurturing and protective. Home and emotional bonds matter deeply.",
    Leo: "confident, expressive and warm-hearted. You shine when noticed and admired.",
    Virgo: "detail-focused, analytical and service-oriented. You find strength in routines.",
    Libra: "diplomatic, harmony-seeking and partnership-oriented. Balance guides you.",
    Scorpio: "intense, transformative and perceptive. You probe beneath the surface.",
    Sagittarius: "optimistic, freedom-loving and philosophical. You grow through exploration.",
    Capricorn: "disciplined, responsible and goal-oriented. Long-term planning suits you.",
    Aquarius: "innovative, humanitarian and original. Community and ideas excite you.",
    Pisces: "imaginative, compassionate and intuitive. Creativity and empathy guide you."
  };
  return map[sign] || "";
}

function degreeTone(deg: number){
  if(deg < 10) return "fresh and pioneering";
  if(deg < 20) return "steady and developing";
  return "mature and fully expressed";
}

function elementFromSign(sign: string){
  const elements: Record<string, string> = {
    Aries:"Fire", Leo:"Fire", Sagittarius:"Fire",
    Taurus:"Earth", Virgo:"Earth", Capricorn:"Earth",
    Gemini:"Air", Libra:"Air", Aquarius:"Air",
    Cancer:"Water", Scorpio:"Water", Pisces:"Water"
  };
  return elements[sign] || "";
}

function sunRemedyText(sign: string){
  const map: Record<string, string> = {
    Aries: "Channel energy into disciplined physical activity and donate red fruit on Tuesdays.",
    Taurus: "Practice mindful saving and keep a small silver object in your wallet.",
    Gemini: "Speak affirmations daily; keep a small notebook for ideas.",
    Cancer: "Create a cozy evening ritual; light a lamp each Monday.",
    Leo: "Practice gratitude and wear yellow/gold on key days.",
    Virgo: "Organize one task daily; offer pulses on Saturdays for steady gains.",
    Libra: "Seek fairness in relationships; light incense in the evening.",
    Scorpio: "Transform through controlled journaling; offer red flowers on Tuesdays.",
    Sagittarius: "Plan short learning trips and donate yellow lentils on Thursdays.",
    Capricorn: "Set long-term milestones and help someone monthly.",
    Aquarius: "Engage in a community project; carry a blue token for inspiration.",
    Pisces: "Keep a creative practice and a small bowl of clean water by your bed."
  };
  return map[sign] || "";
}

function moonRemedyText(sign: string){
  const map: Record<string, string> = {
    Aries: "Try calming breathwork before sleep.",
    Taurus: "Place a gentle light or rose quartz near your bed.",
    Gemini: "Write your feelings nightly for clarity.",
    Cancer: "Keep photos of loved ones and drink warm milk sometimes.",
    Leo: "Take nature walks to relax the emotions.",
    Virgo: "Limit screen time before bed and keep a tidy sleep space.",
    Libra: "Use soft scents and comfort textures to soothe mood.",
    Scorpio: "Take a weekly relaxing saltwater soak.",
    Sagittarius: "Keep a gratitude list and read it weekly.",
    Capricorn: "Short walks after meals help stabilize mood.",
    Aquarius: "Use calming instrumental music at night.",
    Pisces: "Practice visualization before sleep."
  };
  return map[sign] || "";
}

function ascRemedyText(sign: string){
  const map: Record<string, string> = {
    Aries: "Begin days with movement; set bold micro-goals.",
    Taurus: "Place a money plant in the SE of your home and manage finances thoughtfully.",
    Gemini: "Carry a pen and capture ideas; wear communicative colors.",
    Cancer: "Create a comforting home corner and keep soft lighting.",
    Leo: "Use affirmations and visible goal-tracking in warm tones.",
    Virgo: "Plan and organize each morning; use herbal teas for focus.",
    Libra: "Invest in pleasant presentation; balance work and play.",
    Scorpio: "Practice introspection rituals and carry a symbolic red thread.",
    Sagittarius: "Plan monthly adventures and keep travel mementos visible.",
    Capricorn: "Have a consistent morning routine and mentor someone.",
    Aquarius: "Join group activities and act on one new idea monthly.",
    Pisces: "Keep a creative corner and schedule weekly creative time."
  };
  return map[sign] || "";
}

function buildDetailedInterpretation(natal: any){
  const sun = natal.sun.zodiac.sign;
  const sunDeg = natal.sun.zodiac.deg;
  const moon = natal.moon.zodiac.sign;
  const moonDeg = natal.moon.zodiac.deg;
  const asc = natal.ascendant.zodiac.sign;
  const ascDeg = natal.ascendant.zodiac.deg;

  let out = "";
  out += "Overview:\n";
  out += `Your chart shows a Sun in ${sun} (${sunDeg.toFixed(1)}°) which indicates you are ${signPersonality(sun)} This Sun is ${degreeTone(sunDeg)} in its expression.\n\n`;

  out += "Emotional nature:\n";
  out += `With Moon in ${moon} (${moonDeg.toFixed(1)}°), your emotional life is ${signPersonality(moon)} The Moon here is ${degreeTone(moonDeg)}, shaping how you comfort and respond.\n\n`;

  out += "Outer personality & approach to life:\n";
  out += `Your Ascendant (rising sign) is ${asc} (${ascDeg.toFixed(1)}°) — this colors first impressions. You come across as ${signPersonality(asc)} The Ascendant tone is ${degreeTone(ascDeg)}.\n\n`;

  const sunElem = elementFromSign(sun);
  const moonElem = elementFromSign(moon);
  const ascElem = elementFromSign(asc);
  out += "Elemental balance:\n";
  out += `Sun (${sunElem}), Moon (${moonElem}) and Ascendant (${ascElem}) form the primary element mix of your chart. `;
  out += `If two or more are the same element, that element is prominent. `;
  if(sunElem === moonElem && moonElem === ascElem){
    out += `Your chart is strongly ${sunElem}-weighted — this gives a clear, focused flavor to your personality that intensifies strengths and challenges associated with ${sunElem}. `;
  } else {
    out += `You have a mix of elements that brings nuance: ${sunElem}, ${moonElem}, and ${ascElem} together create a blended temperament. `;
  }
  out += "\n\n";

  out += "How these energies interact & practical advice:\n";
  out += `When your Sun's purpose (identity) combines with your Moon's needs (emotion) and your Ascendant's approach (first impressions), you create a unique life pattern. `;
  out += `Practical advice: honor your emotional needs (Moon) while acting on your Sun's goals in small steady steps. Let your Ascendant guide how you present yourself — for example, if your Ascendant is ${asc}, use its strengths in first meetings.\n\n`;

  out += "Personalized Remedies to increase luck & balance:\n";
  const sunRem = sunRemedyText(sun);
  const moonRem = moonRemedyText(moon);
  const ascRem = ascRemedyText(asc);
  out += `Sun remedy: ${sunRem}\n`;
  out += `Moon remedy: ${moonRem}\n`;
  out += `Ascendant remedy: ${ascRem}\n`;
  out += "\n";

  out += "3-step roadmap for the next 3 months:\n";
  out += `1) Focus on a single meaningful goal that aligns with your Sun in ${sun} (small daily progress).\n`;
  out += `2) Support emotional balance with a weekly practice tailored to your Moon in ${moon}.\n`;
  out += `3) Use your Ascendant in ${asc} as a lens for first impressions — update your resume/online profile accordingly.\n\n`;

  out += "Closing note:\n";
  out += "This interpretation is generated from your Sun, Moon, and Ascendant placements and uses simplified astronomical calculations. For deeper precision (houses, aspects, nodes, full ephemeris) consider a pro chart via Swiss Ephemeris. Use these insights as practical, everyday guidance.\n";

  return out;
}

interface InterpretationsProps {
  chart: NatalChart;
}

export default function Interpretations({ chart }: InterpretationsProps) {
  const planets = chart.planetaryData as PlanetPosition[] | null;
  const houses = chart.housesData as any[] | null;
  
  if (!planets || !Array.isArray(planets) || !houses) {
    return null;
  }

  const sun = planets.find(p => p.name === "sun");
  const moon = planets.find(p => p.name === "moon");
  const ascendant = houses?.[0]; // First house cusp is the ascendant

  if (!sun || !moon || !ascendant) {
    return null;
  }

  // Build natal object for the interpretation function
  const natal = {
    sun: {
      zodiac: {
        sign: sun.zodiacSign.charAt(0).toUpperCase() + sun.zodiacSign.slice(1),
        deg: sun.zodiacDegree || 0
      }
    },
    moon: {
      zodiac: {
        sign: moon.zodiacSign.charAt(0).toUpperCase() + moon.zodiacSign.slice(1),
        deg: moon.zodiacDegree || 0
      }
    },
    ascendant: {
      zodiac: {
        sign: ascendant.zodiacSign.charAt(0).toUpperCase() + ascendant.zodiacSign.slice(1),
        deg: ascendant.degree || 0
      }
    }
  };

  // Generate the complete personalized interpretation
  const detailedInterpretation = buildDetailedInterpretation(natal);

  // Format the interpretation text with proper line breaks and sections
  const formatInterpretation = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.trim() === '') return <br key={index} />;
      
      // Check if this is a section header (ends with ':')
      if (line.trim().endsWith(':')) {
        return (
          <h4 key={index} className="font-semibold text-primary mt-6 mb-3 first:mt-0">
            {line.replace(':', '')}
          </h4>
        );
      }
      
      // Check if this is a numbered list item
      if (line.match(/^\d+\)/)) {
        return (
          <p key={index} className="text-muted-foreground leading-relaxed mb-2 ml-4">
            <span className="font-medium text-accent">{line.split(')')[0]})</span>
            {line.substring(line.indexOf(')') + 1)}
          </p>
        );
      }
      
      // Check if this is a remedy line
      if (line.includes('remedy:')) {
        const [label, ...rest] = line.split(':');
        return (
          <p key={index} className="text-muted-foreground leading-relaxed mb-2">
            <span className="font-medium text-accent">{label}:</span>
            {rest.join(':')}
          </p>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
          {line}
        </p>
      );
    });
  };

  return (
    <section data-testid="interpretations">
      <div className="gradient-border">
        <div className="p-8">
          <h2 className="text-2xl font-serif font-semibold mb-6 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Detailed Astrological Interpretation
          </h2>
          
          {/* Personalized Complete Interpretation */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 border border-primary/20" data-testid="detailed-interpretation">
            <div className="prose prose-sm max-w-none">
              {formatInterpretation(detailedInterpretation)}
            </div>
          </div>
          
          {/* Quick Reference Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Sun Reference */}
            <div className="bg-muted/30 rounded-lg p-6 hover:bg-muted/40 transition-colors" data-testid="sun-reference">
              <div className="flex items-center mb-4">
                <Star className="w-6 h-6 text-amber-400 mr-3" />
                <div>
                  <h3 className="font-semibold">Sun in {natal.sun.zodiac.sign}</h3>
                  <p className="text-sm text-muted-foreground">{natal.sun.zodiac.deg.toFixed(1)}° - {degreeTone(natal.sun.zodiac.deg)}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Core identity: {signPersonality(natal.sun.zodiac.sign)}
              </p>
            </div>

            {/* Moon Reference */}
            <div className="bg-muted/30 rounded-lg p-6 hover:bg-muted/40 transition-colors" data-testid="moon-reference">
              <div className="flex items-center mb-4">
                <Moon className="w-6 h-6 text-blue-300 mr-3" />
                <div>
                  <h3 className="font-semibold">Moon in {natal.moon.zodiac.sign}</h3>
                  <p className="text-sm text-muted-foreground">{natal.moon.zodiac.deg.toFixed(1)}° - {degreeTone(natal.moon.zodiac.deg)}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Emotional nature: {signPersonality(natal.moon.zodiac.sign)}
              </p>
            </div>

            {/* Ascendant Reference */}
            <div className="bg-muted/30 rounded-lg p-6 hover:bg-muted/40 transition-colors" data-testid="ascendant-reference">
              <div className="flex items-center mb-4">
                <ArrowUp className="w-6 h-6 text-green-400 mr-3" />
                <div>
                  <h3 className="font-semibold">{natal.ascendant.zodiac.sign} Rising</h3>
                  <p className="text-sm text-muted-foreground">{natal.ascendant.zodiac.deg.toFixed(1)}° - {degreeTone(natal.ascendant.zodiac.deg)}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                First impression: {signPersonality(natal.ascendant.zodiac.sign)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}