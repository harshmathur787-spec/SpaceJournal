
/* interpretations.js - produce detailed, multi-paragraph astrological interpretations
   based on Sun, Moon and Ascendant signs and degree-in-sign.
*/

function signPersonality(sign){
  const map = {
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

function degreeTone(deg){
  if(deg < 10) return "fresh and pioneering";
  if(deg < 20) return "steady and developing";
  return "mature and fully expressed";
}

function elementFromSign(sign){
  const elements = {
    Aries:"Fire", Leo:"Fire", Sagittarius:"Fire",
    Taurus:"Earth", Virgo:"Earth", Capricorn:"Earth",
    Gemini:"Air", Libra:"Air", Aquarius:"Air",
    Cancer:"Water", Scorpio:"Water", Pisces:"Water"
  };
  return elements[sign] || "";
}

function buildDetailedInterpretation(natal){
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

function sunRemedyText(sign){
  const map = {
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

function moonRemedyText(sign){
  const map = {
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

function ascRemedyText(sign){
  const map = {
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
