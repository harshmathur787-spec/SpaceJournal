# Overview

This is a full-stack astrology application that calculates and displays natal birth charts. Users can input their birth details (date, time, location) and receive comprehensive astrological readings including planetary positions, houses, aspects, and interpretations. The application features a modern web interface with chart visualizations and detailed astrological analysis.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React with TypeScript**: Modern component-based frontend using React 18+ with TypeScript for type safety
- **Vite Build System**: Fast development server and optimized production builds
- **Tailwind CSS**: Utility-first CSS framework with custom dark theme and astrological styling
- **Radix UI Components**: Comprehensive UI component library (shadcn/ui) for consistent, accessible interfaces
- **React Query**: Client-side state management and API caching for efficient data fetching
- **React Hook Form**: Form validation and management with Zod schema validation
- **Wouter**: Lightweight client-side routing solution

## Backend Architecture
- **Express.js**: REST API server handling chart calculations and data management
- **TypeScript**: Type-safe server-side development
- **In-Memory Storage**: Simple storage implementation for development (with interface for future database integration)
- **Modular Services**: Separated concerns for ephemeris calculations, geocoding, and interpretations

## Data Layer
- **Drizzle ORM**: Database toolkit configured for PostgreSQL with type-safe schema definitions
- **PostgreSQL Schema**: Structured tables for users and natal charts with JSON fields for complex astrological data
- **Zod Validation**: Runtime type checking and validation for API requests and database operations

## Astrological Calculation Engine
- **Custom Ephemeris Service**: Astronomical calculations for planetary positions using Julian day calculations
- **House System Support**: Multiple house systems (Placidus default) with configurable orb sizes
- **Aspect Calculation**: Major and minor aspects with customizable orb tolerances
- **Zodiac Sign Mapping**: Accurate degree-to-sign conversions with symbols and metadata

## Configuration Management
- **Environment Variables**: Database connections and API keys via environment configuration
- **TypeScript Paths**: Organized import aliases for clean code organization
- **Build Optimization**: Separate client and server builds with proper bundling

The architecture emphasizes modularity, type safety, and maintainability while providing accurate astrological calculations and an intuitive user experience.

# External Dependencies

## Database
- **Neon Database**: Serverless PostgreSQL database for production deployment
- **Drizzle Kit**: Database migrations and schema management

## UI Framework
- **Radix UI**: Headless component primitives for accessible UI elements
- **Lucide React**: Consistent icon library for the interface
- **Tailwind CSS**: Utility-first styling with PostCSS processing

## Development Tools
- **Vite**: Frontend build tool with HMR and optimizations
- **ESBuild**: Fast TypeScript compilation for server builds
- **TypeScript**: Static type checking across the entire codebase

## Runtime Libraries
- **React Query**: Server state management and caching
- **React Hook Form**: Form handling with validation
- **Date-fns**: Date manipulation and formatting utilities
- **Class Variance Authority**: Type-safe styling variants

## Potential Future Integrations
- **Geocoding API**: For location search and coordinate resolution (currently using mock data)
- **Time Zone API**: For accurate timezone handling across global locations
- **Advanced Ephemeris Data**: Swiss Ephemeris or similar for enhanced astronomical accuracy