import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Expand, Download, FileText, Share2 } from "lucide-react";
import type { NatalChart, PlanetPosition, HousePosition } from "@shared/schema";

interface ChartWheelProps {
  chart: NatalChart | null;
}

const ZODIAC_SYMBOLS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

const PLANET_COLORS: Record<string, string> = {
  sun: "#FFA500",
  moon: "#87CEEB",
  mercury: "#FFD700",
  venus: "#FF69B4",
  mars: "#FF4500",
  jupiter: "#9370DB",
  saturn: "#DAA520",
  uranus: "#40E0D0",
  neptune: "#4169E1",
  pluto: "#8B0000"
};

export default function ChartWheel({ chart }: ChartWheelProps) {
  const [zoom, setZoom] = useState(1);

  const planets = chart?.planetaryData as PlanetPosition[] | null;
  const houses = chart?.housesData as HousePosition[] | null;

  const handleZoomIn = () => setZoom(Math.min(zoom * 1.2, 3));
  const handleZoomOut = () => setZoom(Math.max(zoom / 1.2, 0.5));
  const handleReset = () => setZoom(1);

  const exportChart = (format: string) => {
    if (!chart) return;
    
    if (format === "png") {
      // TODO: Implement PNG export
      console.log("Exporting as PNG");
    } else if (format === "pdf") {
      // TODO: Implement PDF export  
      console.log("Exporting as PDF");
    }
  };

  const shareChart = () => {
    if (!chart) return;
    // TODO: Implement sharing functionality
    console.log("Sharing chart");
  };

  return (
    <div className="gradient-border sticky top-24" data-testid="chart-wheel">
      <div className="p-6 text-center">
        <h2 className="text-xl font-serif font-semibold mb-6">Natal Chart Wheel</h2>
        
        {/* Chart Wheel Container */}
        <div className="relative w-full max-w-md mx-auto aspect-square">
          <svg 
            viewBox="0 0 400 400" 
            className="w-full h-full chart-wheel"
            style={{ transform: `scale(${zoom})` }}
            data-testid="chart-svg"
          >
            {/* Background Circle */}
            <circle cx="200" cy="200" r="190" fill="none" stroke="hsl(240, 10%, 25%)" strokeWidth="2"/>
            
            {/* House Divisions */}
            <g stroke="hsl(240, 10%, 30%)" strokeWidth="1" opacity="0.6">
              {Array.from({ length: 12 }, (_, i) => (
                <line
                  key={`house-line-${i}`}
                  x1="200" y1="10" x2="200" y2="40"
                  transform={`rotate(${i * 30} 200 200)`}
                />
              ))}
            </g>

            {/* Zodiac Ring */}
            <circle cx="200" cy="200" r="160" fill="none" stroke="hsl(45, 93%, 47%)" strokeWidth="1" opacity="0.4"/>
            
            {/* Zodiac Signs */}
            <g fill="hsl(45, 93%, 47%)" fontFamily="serif" fontSize="14" textAnchor="middle" dominantBaseline="central">
              {ZODIAC_SYMBOLS.map((symbol, i) => (
                <text
                  key={`zodiac-${i}`}
                  x="200" y="55"
                  transform={`rotate(${i * 30} 200 200)`}
                  data-testid={`zodiac-sign-${i}`}
                >
                  {symbol}
                </text>
              ))}
            </g>

            {/* Planet Ring */}
            <circle cx="200" cy="200" r="130" fill="none" stroke="hsl(260, 70%, 60%)" strokeWidth="1" opacity="0.4"/>

            {/* Planets */}
            {planets && (
              <g className="planet-glow">
                {planets.map((planet, index) => {
                  const angle = (planet.longitude - 90) * (Math.PI / 180); // Convert to radians, adjust for SVG coordinates
                  const x = 200 + 115 * Math.cos(angle);
                  const y = 200 + 115 * Math.sin(angle);
                  const color = PLANET_COLORS[planet.name] || "#FFFFFF";
                  
                  return (
                    <g key={planet.name} data-testid={`planet-${planet.name}`}>
                      <circle 
                        cx={x} 
                        cy={y} 
                        r={planet.name === "sun" ? 6 : planet.name === "moon" ? 5 : 4} 
                        fill={color}
                        className="planet-symbol cursor-pointer"
                        data-testid={`planet-circle-${planet.name}`}
                      />
                      <text 
                        x={x} 
                        y={y + 1}
                        fill="hsl(240, 20%, 6%)" 
                        fontFamily="serif" 
                        fontSize={planet.name === "sun" ? "10" : "9"}
                        textAnchor="middle" 
                        fontWeight="bold"
                        className="planet-symbol cursor-pointer"
                        data-testid={`planet-symbol-${planet.name}`}
                      >
                        {planet.symbol}
                      </text>
                    </g>
                  );
                })}
              </g>
            )}

            {/* House Numbers */}
            {houses && (
              <g fill="hsl(215, 20%, 65%)" fontFamily="sans-serif" fontSize="10" textAnchor="middle" dominantBaseline="central">
                {houses.map((house) => {
                  const angle = (house.cusp - 90) * (Math.PI / 180);
                  const x = 200 + 175 * Math.cos(angle);
                  const y = 200 + 175 * Math.sin(angle);
                  
                  return (
                    <text 
                      key={house.number}
                      x={x} 
                      y={y}
                      data-testid={`house-number-${house.number}`}
                    >
                      {house.number}
                    </text>
                  );
                })}
              </g>
            )}

            {/* Center Point */}
            <circle cx="200" cy="200" r="2" fill="hsl(45, 93%, 47%)"/>
          </svg>

          {/* Chart Controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleZoomIn}
              data-testid="button-zoom-in"
              className="w-8 h-8 p-0"
              title="Zoom In"
            >
              <ZoomIn className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleZoomOut}
              data-testid="button-zoom-out"
              className="w-8 h-8 p-0"
              title="Zoom Out"
            >
              <ZoomOut className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleReset}
              data-testid="button-reset-zoom"
              className="w-8 h-8 p-0"
              title="Reset View"
            >
              <Expand className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Export Options */}
        {chart && (
          <div className="mt-6 flex justify-center space-x-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => exportChart("png")}
              data-testid="button-export-png"
            >
              <Download className="w-4 h-4 mr-2" />
              Save PNG
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => exportChart("pdf")}
              data-testid="button-export-pdf"
            >
              <FileText className="w-4 h-4 mr-2" />
              Save PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={shareChart}
              data-testid="button-share-chart"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Link
            </Button>
          </div>
        )}

        {!chart && (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20" />
              </div>
              <p>Enter birth information to generate chart</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
