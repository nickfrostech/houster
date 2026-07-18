# Hostelly Application Documentation

Welcome to the comprehensive documentation for the **Hostelly** application. This document outlines the architecture, file structure, key components, and routing setup of the React (Vite + TypeScript) codebase.

## Table of Contents
1. [Architecture & Stack](#architecture--stack)
2. [Folder Structure](#folder-structure)
3. [Routing Overview](#routing-overview)
4. [Key Pages & Features](#key-pages--features)
5. [Dashboard Architecture](#dashboard-architecture)
6. [Mock Data & Backend Integration](#mock-data--backend-integration)
7. [UI & Styling Guidelines](#ui--styling-guidelines)

---

## Architecture & Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript (`ES2022` Target)
- **Styling**: Tailwind CSS v3
- **UI Components**: Shadcn UI (Radix UI primitives wrapped with Tailwind)
- **Icons**: Lucide React
- **Animations**: Framer Motion (`motion/react`)
- **Routing**: React Router DOM v6

---

## Folder Structure

The project utilizes absolute path aliases (`@/` maps to `src/`) for clean imports.

```text
src/
├── assets/            # Static files, images, global CSS (App.css, index.css)
├── components/        # Reusable UI elements
│   ├── agents/        # Agent search & filter components
│   ├── hostels/       # Hostel cards & detail views
│   ├── navigations/   # Headers, footers, and mobile bottom nav
│   └── ui/            # Shadcn UI base primitives (buttons, inputs, dialogs)
├── lib/               # Utility functions and shared data
│   ├── utils.ts       # Tailwind class mergers (`cn`)
│   ├── mock_data.ts   # Centralized mock database for UI testing
│   └── types.ts       # Global TypeScript interfaces
├── pages/             # Route-level components
│   ├── auth/          # Login and Signup pages
│   ├── dashboard/     # Agent/User Dashboard sub-pages
│   └── ...            # Main public pages (Landing, Hostels, Agents)
├── App.tsx            # Main router and layout wrapper
└── main.tsx           # React entry point
```

---

## Routing Overview

Routing is centrally handled in `src/App.tsx`. The application is divided into **Public Routes** and **Protected Dashboard Routes**.

### Public Routes
- `/`: `LandingPage` - The marketing home page.
- `/hostels`: `HostelPage` - Browse and filter available hostels.
- `/hostels/:id`: `HostelDetailsPage` - Deep dive into a specific property (images, video, details).
- `/agents`: `AgentPage` - Browse and filter verified agents.
- `/agent/:id`: `AgentProfilePage` - View an agent's details and their specific property listings.
- `/login` & `/signup`: Authentication pages.

### Dashboard Routes (Agent/Landlord Portal)
Nested under `/dashboard`, utilizing the `DashboardLayout` for a persistent sidebar.
- `/dashboard`: `DashboardOverview` - High-level metrics (Total Listings, Inquiries, etc.).
- `/dashboard/listings`: `DashboardListings` - Grid view of the user's uploaded properties.
- `/dashboard/listings/new`: `CreateListingPage` - Multi-step form to create a new property.
- `/dashboard/listings/:id/edit`: `CreateListingPage` (Edit Mode) - Edits an existing property.
- `/dashboard/settings`: `DashboardSettings` - Manage profile, password, and account deletion.

---

## Key Pages & Features

### 1. Landing Page (`LandingPage.tsx`)
A vibrant, animated introduction to the platform. Features a hero section with a search bar, a "How it Works" timeline, and a grid of recently added properties pulled from `mock_data.ts`.

### 2. Hostel Explorer (`HostelPage.tsx` & `HostelDetailsPage.tsx`)
- **HostelPage**: Contains a persistent global Floating Action Button (FAB) that opens a comprehensive filter dialog (Price, Type, Campus, Facilities).
- **HostelDetailsPage**: Features an advanced image/video gallery (videos always sort to the end of the gallery), agent contact cards, and a grid of "Similar Hostels".

### 3. Agent Explorer (`AgentPage.tsx` & `AgentProfilePage.tsx`)
- **AgentPage**: Displays a grid of verified agents. Also features a FAB filter for filtering agents by specialization or rating.
- **AgentProfilePage**: A combined view of an agent's biodata (verification status, rating, contact info) and a grid of the specific properties they manage.

---

## Dashboard Architecture

The dashboard (`src/pages/dashboard/`) is a critical sub-system designed for property managers. 

### Core Components:
- **`DashboardLayout.tsx`**: Provides the structural shell. It includes a responsive sidebar (desktop) that collapses into a hamburger menu (mobile). Uses `useLocation` to highlight active routes with `rounded-full` active states.
- **`DashboardOverview.tsx`**: Displays stylized metric cards using `rounded-3xl` corners, dynamic hover scaling, and subtle abstract gradient backgrounds.
- **`DashboardListings.tsx`**: Reuses the visual structure of the public `HostelCard`, but swaps public interactions (like "View Details") for management interactions ("Edit" and "Delete"). Features an elegant empty-state UI if no properties exist.
- **`CreateListingPage.tsx`**: A heavy-duty, dual-purpose form. 
  - **Create Mode**: Blank slate for new properties.
  - **Edit Mode**: If an `:id` parameter exists, it pre-fills data.
  - **Advanced Features**: Includes a custom dynamic tag-input for facilities (max 8), character limits on descriptions, conditional inputs (e.g., selecting "Others" for Campus reveals a custom text input), and mock media upload logic.
- **`DashboardSettings.tsx`**: Manages personal info and features a highly visible "Danger Zone" for account deletion, requiring a two-step confirmation to prevent accidental data loss.

---

## Mock Data & Backend Integration

Currently, the application relies on `src/lib/mock_data.ts` to populate the UI. 

### Transitioning to a Real Backend:
Throughout the codebase, you will find extensive **BACKEND INTEGRATION NOTES** in block comments. These outline exactly where to replace mock state with API calls.
1. **Fetching Data**: Replace `RECENT_HOSTELS` and `AGENTS` imports with `useEffect` blocks that fetch from endpoints like `GET /api/hostels`.
2. **Submitting Forms**: Update `handleSubmit` functions (e.g., in `CreateListingPage.tsx`) to build a `FormData` object (vital for handling image/video file uploads) and `POST` to your server.
3. **Authentication**: Implement JWT or session-based auth wrappers around the `/dashboard` routes in `App.tsx` to prevent unauthorized access.

---

## UI & Styling Guidelines

The application strictly adheres to a modern, rounded, and premium aesthetic:
- **Buttons & Inputs**: Exclusively use `h-11!` and `rounded-full` to maintain a consistent, pill-shaped aesthetic across all forms and actions.
- **Cards & Containers**: Utilize heavy rounding (`rounded-3xl` or `rounded-4xl`) for major structural blocks, paired with soft borders (`border-border/50`) and subtle shadows.
- **Gradients**: Use `bg-linear-to-br` (Tailwind v4 syntax) or `bg-gradient-to-br` for soft, elegant background tints rather than flat colors where appropriate.
- **Micro-interactions**: Framer Motion (`whileHover={{ y: -4 }}`) and Tailwind `group-hover` utilities are heavily used to make cards and icons feel responsive and alive.
