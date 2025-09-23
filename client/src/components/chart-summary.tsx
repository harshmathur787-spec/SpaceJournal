import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Sun, Moon, TrendingUp, Home, Zap, Globe } from "lucide-react";
import type { NatalChart, PlanetPosition, HousePosition, AspectData } from "@shared/schema";

interface ChartSummaryProps {
  chart: NatalChart;
}

export default function ChartSummary({ chart }: ChartSummaryProps) {
  const planets = chart.planetaryData as PlanetPosition[];
  const houses = chart.housesData as HousePosition[];
  const aspects = chart.aspectsData as AspectData[];

  // Find key planets
  const sun = planets?.find(p => p.name === "sun");
  const moon = planets?.find(p => p.name === "moon");
  const ascendant = houses?.[0]; // First house cusp is the ascendant

  // Calculate element distribution
  const elementCounts = planets?.reduce((acc, planet) => {
    const sign = planet.zodiacSign;
    const elements = {
      aries: 'fire', taurus: 'earth', gemini: 'air', cancer: 'water',
      leo: 'fire', virgo: 'earth', libra: 'air', scorpio: 'water',
      sagittarius: 'fire', capricorn: 'earth', aquarius: 'air', pisces: 'water'
    };
    const element = elements[sign];
    acc[element] = (acc[element] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  // Calculate modality distribution
  const modalityCounts = planets?.reduce((acc, planet) => {
    const sign = planet.zodiacSign;
    const modalities = {
      aries: 'cardinal', taurus: 'fixed', gemini: 'mutable', cancer: 'cardinal',
      leo: 'fixed', virgo: 'mutable', libra: 'cardinal', scorpio: 'fixed',
      sagittarius: 'mutable', capricorn: 'cardinal', aquarius: 'fixed', pisces: 'mutable'
    };
    const modality = modalities[sign];
    acc[modality] = (acc[modality] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  // Find major aspects
  const majorAspects = aspects?.filter(aspect => 
    ['conjunction', 'opposition', 'trine', 'square', 'sextile'].includes(aspect.aspectType)
  ) || [];

  // Find house emphasis (which houses have the most planets)
  const houseCounts = planets?.reduce((acc, planet) => {
    acc[planet.house] = (acc[planet.house] || 0) + 1;
    return acc;
  }, {} as Record<number, number>) || {};

  const emphasizedHouses = Object.entries(houseCounts)
    .filter(([_, count]) => count >= 2)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  // Retrograde planets
  const retrogradePlanets = planets?.filter(p => p.isRetrograde) || [];

  return (
    <Card className="w-full" data-testid="chart-summary">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="w-5 h-5 text-primary mr-3" />
          Chart Summary for {chart.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Birth Details */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Birth Information</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span data-testid="birth-date">{chart.birthDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span data-testid="birth-time">{chart.birthTime}</span>
            </div>
            <div className="flex justify-between sm:col-span-2">
              <span className="text-muted-foreground">Location:</span>
              <span data-testid="birth-location" className="text-right">{chart.birthLocation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">House System:</span>
              <span data-testid="house-system" className="capitalize">{chart.houseSystem}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Orb Size:</span>
              <span data-testid="orb-size" className="capitalize">{chart.orbSize}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Big Three */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">The Big Three</h4>
          <div className="grid grid-cols-1 gap-3">
            {sun && (
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg" data-testid="sun-sign">
                <span className="flex items-center">
                  <Sun className="w-4 h-4 text-amber-400 mr-2" />
                  <span className="font-medium">Sun Sign</span>
                </span>
                <span className="text-primary font-semibold capitalize">
                  {sun.zodiacSign} {Math.floor(sun.zodiacDegree)}°
                </span>
              </div>
            )}
            {moon && (
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg" data-testid="moon-sign">
                <span className="flex items-center">
                  <Moon className="w-4 h-4 text-blue-300 mr-2" />
                  <span className="font-medium">Moon Sign</span>
                </span>
                <span className="text-accent font-semibold capitalize">
                  {moon.zodiacSign} {Math.floor(moon.zodiacDegree)}°
                </span>
              </div>
            )}
            {ascendant && (
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg" data-testid="ascendant-sign">
                <span className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
                  <span className="font-medium">Ascendant</span>
                </span>
                <span className="text-primary font-semibold capitalize">
                  {ascendant.zodiacSign} {Math.floor(ascendant.zodiacDegree)}°
                </span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Planetary Distribution */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Planetary Distribution</h4>
          
          {/* Elements */}
          <div>
            <h5 className="text-sm font-medium mb-2">Elements</h5>
            <div className="flex flex-wrap gap-2" data-testid="element-distribution">
              {Object.entries(elementCounts).map(([element, count]) => (
                <Badge key={element} variant="secondary" className="capitalize">
                  <Zap className="w-3 h-3 mr-1" />
                  {element}: {count}
                </Badge>
              ))}
            </div>
          </div>

          {/* Modalities */}
          <div>
            <h5 className="text-sm font-medium mb-2">Modalities</h5>
            <div className="flex flex-wrap gap-2" data-testid="modality-distribution">
              {Object.entries(modalityCounts).map(([modality, count]) => (
                <Badge key={modality} variant="outline" className="capitalize">
                  <Globe className="w-3 h-3 mr-1" />
                  {modality}: {count}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        {/* House Emphasis */}
        {emphasizedHouses.length > 0 && (
          <>
            <div className="space-y-3">
              <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">House Emphasis</h4>
              <div className="space-y-2" data-testid="house-emphasis">
                {emphasizedHouses.map(([house, count]) => (
                  <div key={house} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                    <span className="flex items-center">
                      <Home className="w-4 h-4 text-muted-foreground mr-2" />
                      House {house}
                    </span>
                    <span className="text-sm font-medium">{count} planet{count > 1 ? 's' : ''}</span>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Major Aspects */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Major Aspects</h4>
          <div className="space-y-2" data-testid="major-aspects">
            <div className="text-sm text-muted-foreground">
              {majorAspects.length} major aspects found
            </div>
            {majorAspects.slice(0, 5).map((aspect, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded text-sm">
                <span className="capitalize">
                  {aspect.planet1} {aspect.aspectType} {aspect.planet2}
                </span>
                <span className="text-muted-foreground">
                  {Math.abs(aspect.orb).toFixed(1)}° orb
                </span>
              </div>
            ))}
            {majorAspects.length > 5 && (
              <div className="text-xs text-muted-foreground text-center pt-2">
                + {majorAspects.length - 5} more aspects...
              </div>
            )}
          </div>
        </div>

        {/* Retrograde Planets */}
        {retrogradePlanets.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Retrograde Planets</h4>
              <div className="flex flex-wrap gap-2" data-testid="retrograde-planets">
                {retrogradePlanets.map((planet) => (
                  <Badge key={planet.name} variant="destructive" className="capitalize">
                    {planet.symbol} {planet.name} ℞
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* Chart Statistics */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Chart Statistics</h4>
          <div className="grid grid-cols-2 gap-4 text-sm" data-testid="chart-statistics">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Planets:</span>
              <span className="font-medium">{planets?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Major Aspects:</span>
              <span className="font-medium">{majorAspects.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Retrograde:</span>
              <span className="font-medium">{retrogradePlanets.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">House System:</span>
              <span className="font-medium capitalize">{chart.houseSystem}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}