# Overview

This is a full-stack web application built with React frontend and Express.js backend, featuring a modern tech stack with TypeScript, Tailwind CSS, and shadcn/ui components. The application appears to be designed for content automation or social media management, with an onboarding flow that collects user information, social media accounts, and content preferences across different niches (motivation, love/shayari, business, ASMR, tech).

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Form Handling**: React Hook Form with Zod validation through @hookform/resolvers

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: PostgreSQL-based sessions using connect-pg-simple
- **Development**: Hot reload with tsx for TypeScript execution

## Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Centralized in `shared/schema.ts` for type sharing between frontend and backend
- **Migrations**: Managed through Drizzle Kit with migrations stored in `./migrations`
- **Current Schema**: Users table with id (UUID), username (unique), and password fields

## Development Workflow
- **Monorepo Structure**: Client and server code in separate directories with shared types
- **Build Process**: Vite for frontend bundling, esbuild for backend compilation
- **Development Server**: Concurrent frontend (Vite) and backend (Express) with proxy setup
- **Type Safety**: Shared TypeScript types between client and server via `shared/` directory

## Storage Layer
- **Interface**: Abstracted storage interface (`IStorage`) allowing for different implementations
- **Current Implementation**: In-memory storage (`MemStorage`) for development
- **Production Ready**: Configured for PostgreSQL with Neon Database serverless driver

## Authentication & Security
- **Session-based**: Using PostgreSQL for session persistence
- **Password Handling**: Prepared for secure password hashing (implementation pending)
- **CORS**: Configured for cross-origin requests with credentials

## UI/UX Design
- **Design System**: Dark theme with purple/blue color palette
- **Component Library**: Comprehensive set of reusable components from shadcn/ui
- **Responsive**: Mobile-first approach with responsive breakpoints
- **Accessibility**: Built on Radix UI primitives ensuring ARIA compliance

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: Neon Database serverless PostgreSQL driver
- **drizzle-orm & drizzle-kit**: Type-safe ORM and migration tool for PostgreSQL
- **express**: Web application framework for Node.js
- **react & react-dom**: Frontend UI library
- **vite**: Frontend build tool and development server

## UI and Styling
- **@radix-ui/***: Comprehensive set of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for creating type-safe component variants
- **clsx & tailwind-merge**: Utilities for conditional and merged class names

## State Management and Data Fetching
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Performant forms with easy validation
- **@hookform/resolvers**: Validation resolvers for react-hook-form
- **zod & drizzle-zod**: Schema validation and type inference

## Development and Build Tools
- **typescript**: Static type checking
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for backend
- **@replit/vite-plugin-***: Replit-specific development enhancements

## Session and Security
- **connect-pg-simple**: PostgreSQL session store for Express
- **nanoid**: Secure URL-friendly unique ID generator

## Utilities and Helpers
- **date-fns**: Modern JavaScript date utility library
- **lucide-react**: Beautiful and consistent icon library
- **cmdk**: Command palette component
- **embla-carousel-react**: Carousel component library