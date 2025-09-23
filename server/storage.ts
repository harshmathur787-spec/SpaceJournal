import { type User, type InsertUser, type NatalChart, type InsertNatalChart } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getNatalChart(id: string): Promise<NatalChart | undefined>;
  createNatalChart(chart: InsertNatalChart): Promise<NatalChart>;
  getNatalChartsByUser(userId: string): Promise<NatalChart[]>;
  updateNatalChart(id: string, chart: Partial<NatalChart>): Promise<NatalChart | undefined>;
  deleteNatalChart(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private natalCharts: Map<string, NatalChart>;

  constructor() {
    this.users = new Map();
    this.natalCharts = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getNatalChart(id: string): Promise<NatalChart | undefined> {
    return this.natalCharts.get(id);
  }

  async createNatalChart(insertChart: InsertNatalChart): Promise<NatalChart> {
    const id = randomUUID();
    const chart: NatalChart = { 
      ...insertChart, 
      id,
      createdAt: new Date(),
      houseSystem: insertChart.houseSystem || "placidus",
      orbSize: insertChart.orbSize || "normal",
      planetaryData: insertChart.planetaryData || null,
      housesData: insertChart.housesData || null,
      aspectsData: insertChart.aspectsData || null
    };
    this.natalCharts.set(id, chart);
    return chart;
  }

  async getNatalChartsByUser(userId: string): Promise<NatalChart[]> {
    return Array.from(this.natalCharts.values()).filter(
      (chart) => chart.id === userId // In a real app, we'd have userId field
    );
  }

  async updateNatalChart(id: string, updates: Partial<NatalChart>): Promise<NatalChart | undefined> {
    const existing = this.natalCharts.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...updates };
    this.natalCharts.set(id, updated);
    return updated;
  }

  async deleteNatalChart(id: string): Promise<boolean> {
    return this.natalCharts.delete(id);
  }
}

export const storage = new MemStorage();
