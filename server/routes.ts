import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { birthDataSchema, locationResultSchema } from "@shared/schema";
import { calculateNatalChart } from "./services/ephemeris";
import { geocodeLocation, searchLocations } from "./services/geocoding";
import { generateLuckRemedies } from "./services/luck-remedies";

export async function registerRoutes(app: Express): Promise<Server> {
  // Calculate natal chart
  app.post("/api/calculate-chart", async (req, res) => {
    try {
      const birthData = birthDataSchema.parse(req.body);
      
      // Calculate planetary positions, houses, and aspects
      const chartData = await calculateNatalChart(birthData);
      
      // Generate personalized luck remedies
      const luckRemedies = generateLuckRemedies(chartData.planets, chartData.aspects, chartData.houses);
      
      // Store the natal chart
      const natalChart = await storage.createNatalChart({
        name: birthData.name,
        birthDate: birthData.birthDate,
        birthTime: birthData.birthTime,
        birthLocation: birthData.birthLocation,
        latitude: birthData.latitude,
        longitude: birthData.longitude,
        timezone: birthData.timezone,
        houseSystem: birthData.houseSystem,
        orbSize: birthData.orbSize,
        planetaryData: chartData.planets,
        housesData: chartData.houses,
        aspectsData: chartData.aspects,
        luckRemedies: luckRemedies,
      });

      res.json({
        success: true,
        chart: natalChart,
        calculations: chartData
      });
    } catch (error) {
      console.error("Error calculating chart:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to calculate chart" 
      });
    }
  });

  // Get natal chart by ID
  app.get("/api/charts/:id", async (req, res) => {
    try {
      const chart = await storage.getNatalChart(req.params.id);
      if (!chart) {
        return res.status(404).json({ success: false, error: "Chart not found" });
      }
      res.json({ success: true, chart });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: "Failed to retrieve chart" 
      });
    }
  });

  // Search locations for autocomplete
  app.get("/api/locations/search", async (req, res) => {
    try {
      const { query } = req.query;
      if (!query || typeof query !== "string") {
        return res.status(400).json({ 
          success: false, 
          error: "Query parameter is required" 
        });
      }

      const locations = await searchLocations(query);
      res.json({ success: true, locations });
    } catch (error) {
      console.error("Error searching locations:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to search locations" 
      });
    }
  });

  // Geocode a specific location
  app.post("/api/locations/geocode", async (req, res) => {
    try {
      const { location } = req.body;
      if (!location || typeof location !== "string") {
        return res.status(400).json({ 
          success: false, 
          error: "Location is required" 
        });
      }

      const geocoded = await geocodeLocation(location);
      if (!geocoded) {
        return res.status(404).json({ 
          success: false, 
          error: "Location not found" 
        });
      }

      res.json({ success: true, location: geocoded });
    } catch (error) {
      console.error("Error geocoding location:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to geocode location" 
      });
    }
  });

  // Export chart data
  app.get("/api/charts/:id/export", async (req, res) => {
    try {
      const { format } = req.query;
      const chart = await storage.getNatalChart(req.params.id);
      
      if (!chart) {
        return res.status(404).json({ success: false, error: "Chart not found" });
      }

      if (format === "json") {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Content-Disposition", `attachment; filename="${chart.name}-natal-chart.json"`);
        res.json(chart);
      } else {
        res.status(400).json({ success: false, error: "Unsupported format" });
      }
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: "Failed to export chart" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
