import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  AlertTriangle, 
  Circle,
  ChevronDown,
  ChevronUp,
  Heart,
  DollarSign,
  Briefcase,
  Activity,
  Sparkles
} from "lucide-react";
import { generateAdvice } from "@/lib/astrology-utils";
import { PlanetPosition, AspectData, HousePosition, AdviceResult, AdviceCategory } from "@shared/schema";
import { adviceRules } from "@shared/adviceRules";

interface AdvicePanelProps {
  planets: PlanetPosition[];
  aspects: AspectData[];
  houses: HousePosition[];
}

const categoryConfig = {
  finance: {
    title: "Financial Life",
    description: "Money, resources, and material security",
    icon: DollarSign,
    color: "text-green-600"
  },
  partner: {
    title: "Life Partner",
    description: "Love, relationships, and partnerships",
    icon: Heart,
    color: "text-rose-600"
  },
  career: {
    title: "Career",
    description: "Professional path and achievements",
    icon: Briefcase,
    color: "text-blue-600"
  },
  health: {
    title: "Health",
    description: "Physical wellness and vitality",
    icon: Activity,
    color: "text-orange-600"
  }
};

function getEffectIcon(effect: string) {
  switch (effect) {
    case "positive":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "challenge":
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    default:
      return <Circle className="h-4 w-4 text-gray-400" />;
  }
}

function getScoreColor(score: number) {
  if (score >= 70) return "text-green-600";
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
}

interface AdviceItemProps {
  advice: string;
  effect: "positive" | "challenge" | "neutral";
  weight: number;
  evidence: string[];
}

function AdviceItem({ advice, effect, weight, evidence }: AdviceItemProps) {
  const [showEvidence, setShowEvidence] = useState(false);

  return (
    <div className="border rounded-lg p-4 mb-3">
      <div className="flex items-start gap-3">
        {getEffectIcon(effect)}
        <div className="flex-1">
          <p className="text-sm leading-relaxed">{advice}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="text-xs">
              Weight: {weight}/5
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowEvidence(!showEvidence)}
              className="text-xs h-6 px-2"
              data-testid={`button-evidence-${advice.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`}
            >
              Why?
              {showEvidence ? (
                <ChevronUp className="h-3 w-3 ml-1" />
              ) : (
                <ChevronDown className="h-3 w-3 ml-1" />
              )}
            </Button>
          </div>
          {showEvidence && (
            <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs">
              <p className="font-medium mb-1">Based on:</p>
              {evidence.map((item, index) => (
                <div key={index} className="text-gray-600 dark:text-gray-300">
                  • {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface CategoryContentProps {
  result: AdviceResult;
  category: AdviceCategory;
}

function CategoryContent({ result, category }: CategoryContentProps) {
  const config = categoryConfig[category];
  const IconComponent = config.icon;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <IconComponent className={`h-6 w-6 ${config.color}`} />
            <div className="flex-1">
              <CardTitle className="text-lg">{config.title} Score</CardTitle>
              <CardDescription>{config.description}</CardDescription>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                {result.score}
              </div>
              <div className="text-xs text-gray-500">out of 100</div>
            </div>
          </div>
          <Progress value={result.score} className="mt-3" />
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Personalized Recommendations
          </CardTitle>
          <CardDescription>
            Based on your planetary positions and aspects
          </CardDescription>
        </CardHeader>
        <CardContent>
          {result.items.length > 0 ? (
            <div className="space-y-0">
              {result.items.map((item, index) => (
                <AdviceItem
                  key={index}
                  advice={item.advice}
                  effect={item.effect}
                  weight={item.weight}
                  evidence={item.evidence}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No specific patterns found for this area.</p>
              <p className="text-sm mt-1">
                This doesn't mean anything negative - your chart may simply have neutral indicators for this life area.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function AdvicePanel({ planets, aspects, houses }: AdvicePanelProps) {
  const [selectedCategory, setSelectedCategory] = useState<AdviceCategory>("finance");

  // Generate advice results using the analysis engine
  const adviceResults = useMemo(() => {
    try {
      const results = generateAdvice(planets, aspects, houses, adviceRules);
      return results.reduce((acc, result) => {
        acc[result.category] = result;
        return acc;
      }, {} as Record<AdviceCategory, AdviceResult>);
    } catch (error) {
      console.error("Error generating advice:", error);
      // Return empty results on error
      return {
        finance: { category: "finance", score: 50, items: [] },
        partner: { category: "partner", score: 50, items: [] },
        career: { category: "career", score: 50, items: [] },
        health: { category: "health", score: 50, items: [] }
      } as Record<AdviceCategory, AdviceResult>;
    }
  }, [planets, aspects, houses]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Life Guidance</CardTitle>
        <CardDescription>
          Personalized advice based on your astrological chart for key life areas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as AdviceCategory)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger 
              value="finance" 
              className="text-xs"
              data-testid="button-advice-finance"
            >
              <DollarSign className="h-4 w-4 mr-1" />
              Financial
            </TabsTrigger>
            <TabsTrigger 
              value="partner" 
              className="text-xs"
              data-testid="button-advice-partner"
            >
              <Heart className="h-4 w-4 mr-1" />
              Partner
            </TabsTrigger>
            <TabsTrigger 
              value="career" 
              className="text-xs"
              data-testid="button-advice-career"
            >
              <Briefcase className="h-4 w-4 mr-1" />
              Career
            </TabsTrigger>
            <TabsTrigger 
              value="health" 
              className="text-xs"
              data-testid="button-advice-health"
            >
              <Activity className="h-4 w-4 mr-1" />
              Health
            </TabsTrigger>
          </TabsList>

          {Object.entries(categoryConfig).map(([category, config]) => (
            <TabsContent key={category} value={category} className="mt-4">
              <div data-testid={`panel-advice-${category}`}>
                <CategoryContent 
                  result={adviceResults[category as AdviceCategory]} 
                  category={category as AdviceCategory} 
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}