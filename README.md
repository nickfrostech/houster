<div align="center">
  <h1>🏨 Hostelly</h1>
  <p><strong>A Modern, Premium, and Dynamic Student Housing Platform</strong></p>
  <p>Bridging the gap between students, verified agents, and landlords with a seamless property discovery experience.</p>
</div>

---

## 📖 Overview

**Hostelly** is a cutting-edge web application built to simplify the search for student accommodation. Designed with a strict premium aesthetic and highly interactive micro-animations, it offers an intuitive platform for students to filter, explore, and contact agents regarding available hostels. 

For property managers and agents, Hostelly provides a robust **Dashboard** to manage their property portfolio, update listings with rich media, and monitor their profile—all built on a fast, modern React stack.

> **Note on Architecture:** This README serves as the high-level entry point for developers. For an exhaustive breakdown of routing, component patterns, and backend integration instructions, please consult the primary [Documentation Guide](./documentation.md).

---

## ✨ Core Features

### 🔍 Advanced Property Discovery
- **Dynamic Grids:** Fluid, responsive layouts showcasing high-quality property cards.
- **Floating Action Filters (FAB):** A global mobile-optimized filter interface allowing users to drill down by price range, property type (Self-Contain, Flat, etc.), campus location, and specific facilities.
- **Rich Media Galleries:** Property details pages support complex image carousels and automatic video integrations.

### 🛡️ Verified Agent Ecosystem
- **Agent Directory:** A dedicated space to browse property managers.
- **Trust Indicators:** Visual verification badges (`Verified Agent`) and rating systems.
- **Agent Profiles:** Deep-dive pages showing an agent's contact information, active portfolio, and direct WhatsApp/Phone integration.

### 📊 Comprehensive Management Dashboard
- **Protected Routing:** A dedicated `/dashboard` environment for landlords and agents.
- **Listing Management:** A highly complex Create/Edit listing form supporting:
  - Dynamic facility tag inputs (max 8 tags).
  - Character-limited descriptions with real-time counters.
  - Multi-file media uploads (max 4 images, 1 video).
  - Conditional custom inputs (e.g., selecting "Others" reveals manual entry fields).
- **Settings & Security:** Profile updates, password management, and a secure two-step "Danger Zone" for account deletion.

### 🎨 Premium UI & UX
- **Strict Aesthetic Constraints:** Enforced use of `h-11` heights and `rounded-full` / `rounded-3xl` border radiuses for a soft, modern look.
- **Persistent Theme Context:** A robust `ThemeProvider` that defaults to the user's OS preference (`system`), allows manual Light/Dark toggling, and persists instantly via `localStorage`.
- **Smart Navigation:** Includes a `ScrollToTop` router interceptor to ensure users always start at the top of the page during transitions.

---

## 🛠️ Technology Stack

Hostelly leverages a modern, type-safe ecosystem optimized for developer experience and end-user performance.

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [React 18](https://react.dev/) | Core view library |
| **Build Tool** | [Vite](https://vitejs.dev/) | Lightning fast HMR and compilation |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Static typing targeting `ES2022` |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| **UI Library** | [Shadcn UI](https://ui.shadcn.com/) | Accessible, unstyled Radix UI primitives |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Spring-based micro-interactions |
| **Routing** | [React Router v6](https://reactrouter.com/) | Client-side routing and layout management |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, consistent SVG icon set |

---

## 🏗️ Project Structure

The codebase is organized modularly. We utilize absolute path aliases (`@/` maps to `src/`).

```text
hostelly/
├── src/
│   ├── assets/            # Global stylesheets and static assets
│   ├── components/        # Reusable feature components
│   │   ├── agents/        # Agent search & result views
│   │   ├── hostels/       # Property cards, galleries, and sidebars
│   │   ├── navigations/   # Topbar, bottom nav (mobile), and footer
│   │   └── ui/            # Base Shadcn UI primitives (Buttons, Inputs)
│   ├── hooks/             # Custom React hooks (e.g., use-agents-explorer)
│   ├── lib/               # Utilities, Types, and Mock Database
│   └── pages/             # High-level route components
│       ├── auth/          # Login & Signup flows
│       └── dashboard/     # Protected agent management views
├── documentation.md       # 📚 Detailed Architecture Guide
├── vercel.json            # Deployment routing rules
└── package.json           # Dependencies and scripts
```

---

## 💻 Developer Setup Guide

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **pnpm** (preferred package manager)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hostelly.git
   cd hostelly
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the Development Server**
   ```bash
   pnpm run dev
   ```
   *The application will be available at `http://localhost:5173`.*

4. **Run Type Checking & Linter**
   ```bash
   pnpm run check
   ```

### Connecting a Backend
Currently, the UI is fully functional but populated via a centralized mock database (`src/lib/mock_data.ts`). To wire this up to a real backend (e.g., Node/Express, Supabase, Firebase):
- Search the codebase for `BACKEND INTEGRATION NOTE`.
- Replace `useEffect` mock state setters with actual `fetch` or `axios` calls.
- Update the Dashboard forms to submit `FormData` payloads to your API.
- *See [documentation.md](./documentation.md) for deeper implementation guidelines.*

---

## 🚀 Deployment

Hostelly is pre-configured for zero-config deployments on **Vercel**. 

A `vercel.json` file is included to handle React Router's SPA fallback requirements. This ensures that users navigating directly to a deep link (like `/hostels/123`) or refreshing the page will not encounter a `404 Not Found` error.

**To deploy:**
1. Commit and push your code to your GitHub repository.
2. Log into [Vercel](https://vercel.com) and click **Add New > Project**.
3. Import your GitHub repository.
4. Vercel will automatically detect the **Vite** framework.
5. Click **Deploy**.

---

<div align="center">
  <p>Built with ❤️ to redefine student housing experiences.</p>
</div>
