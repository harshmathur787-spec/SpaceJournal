import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Gift, Star, Sun, Moon } from "lucide-react";
import { LuckRemedy } from "@shared/schema";

interface LuckRemediesProps {
  remedies: LuckRemedy[];
}

// Icon mapping
const iconMap = {
  gift: Gift,
  star: Star,
  sparkles: Sparkles,
  sun: Sun,
  moon: Moon,
};

export default function LuckRemedies({ remedies }: LuckRemediesProps) {
  // Handle loading state
  if (!remedies || remedies.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold gradient-text mb-2">Luck Enhancement & Remedies</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Personalized remedies to enhance your fortune and positive energy based on your birth chart
          </p>
        </div>
        <div className="text-center py-8">
          <Sparkles className="h-12 w-12 text-purple-500 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600 dark:text-gray-400">Loading your personalized luck remedies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text mb-2">Luck Enhancement & Remedies</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Personalized remedies to enhance your fortune and positive energy based on your birth chart
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {remedies.map((remedy, index) => {
          const IconComponent = iconMap[remedy.iconType];
          
          return (
            <Card key={index} className="border-purple-200 dark:border-purple-800 hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <IconComponent className={`h-6 w-6 ${remedy.color}`} />
                  <CardTitle className="text-lg">{remedy.title}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {remedy.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                      Practices
                    </Badge>
                  </div>
                  <ul className="space-y-2">
                    {remedy.practices.map((practice, practiceIndex) => (
                      <li key={practiceIndex} className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1.5 flex-shrink-0">•</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}