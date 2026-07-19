# SmartWall Frontend Client

SmartWall is a modern, design-forward web application that helps visitors explore paint color possibilities through an intuitive visualizer experience. It turns room repainting from a risky guess into a quick, confidence-building visual decision.

This directory contains the frontend code built with **React 19**, **Vite 8**, and **Tailwind CSS v4**.

---

## 🚀 Tech Stack

The frontend is built using the following modern web technologies:

*   **Core Framework**: [React 19](https://react.dev/) & [Vite 8](https://vite.dev/) for extremely fast builds and hot module replacement (HMR).
*   **Styling & Design System**: [Tailwind CSS v4](https://tailwindcss.com/) for high-performance utility-first styling with native CSS variables and modern CSS features.
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid page transitions, scroll-driven animations, and premium micro-animations.
*   **Routing**: [React Router DOM v7](https://reactrouter.com/) for page navigation and layouts.
*   **Form & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for schemas and robust form validation.
*   **Icons**: [Lucide React](https://lucide.dev/) for a consistent, premium vector icon library.
*   **HTTP Client**: [Axios](https://axios-http.com/) for API integrations with the backend server.

---

## 🎨 Key Features & Modules

### 1. Landing Experience (`/`)
An immersive, design-driven landing page that focuses on emotional reward and visual clarity:
*   **Hero Section**: Bold value proposition with interactive, clean design.
*   **Interactive Preview**: Low-pressure room painting simulations.
*   **Scroll Features**: Immersive, step-by-step room transformation walkthroughs (`ScrollFeaturesSection`).
*   **Mobile-Optimized Walkthroughs**: Seamless step-by-step instructions built for smaller viewports (`MobileScrollSteps`).
*   **Color Collections**: Premium palettes showcasing design-centric color choices (`ColorCollections`).

### 2. Color Explorer (`/colors`)
A curated directory of harmonious color collections designed to let users explore paint colors, filter collections, and select palettes with absolute confidence.

### 3. Interactive Paint Editor (`/editor`)
The core room visualizer tool enabling users to preview paint colors live on their walls:
*   **`CanvasWorkspace`**: The interactive workspace for painting and visualization overlay.
*   **`EditorToolbar` / `ToolSidebar`**: Tools for brush settings, color selection, layer options, and undo/redo operations.
*   **`PropertiesPanel` / `BottomColorPalette`**: Adjust palette configurations, track color match metadata, and preview palettes.
*   **`RecentColorsCapsule`**: High-priority access to recently used color selections.

### 4. Project Dashboard & Settings (`/dashboard`)
*   **Projects Workspace (`/projects`)**: Create, list, search, and manage ongoing painting visualizer projects.
*   **Colors Dashboard (`/colors-dashboard`)**: Manage saved colors, customized collections, and personal palettes.
*   **Settings (`/settings`)**: Manage user profile preferences and visualizer configurations.

---

## 📁 Project Structure

The project follows a modular, feature-based architecture to keep code organized and scalable:

```text
client/
├── public/              # Static assets (images, icons, etc.)
└── src/
    ├── assets/          # Global assets used in React code
    ├── components/      # Shared, reusable UI components (buttons, inputs, cards)
    ├── features/        # Feature-based folders containing layout & sub-components
    │   ├── auth/        # Authentication components & login page
    │   ├── dashboard/   # Dashboard workspace and sections (Editor, Projects, Settings)
    │   └── home/        # Public routes: Landing page features & Colors explorer
    ├── layouts/         # App layouts (e.g., standard page layouts, sidebar dashboards)
    ├── routes/          # Navigation config and routes mapping (AppRoutes.jsx)
    ├── styles/          # Global CSS, design tokens, and theme settings
    ├── App.jsx          # Root application component
    └── main.jsx         # App entry point
```

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### Installation

1. Clone or navigate to the repository directory.
2. Navigate to the `client` directory:
   ```bash
   cd client
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the Vite development server locally, run:
```bash
npm run dev
```
The application will default to running on `http://localhost:5173`.

### Build & Production Preview

To compile the application into static production assets:
```bash
npm run build
```
The output files will be created in the `dist/` directory.

To preview the built production bundle locally:
```bash
npm run preview
```

### Code Styling & Quality

Verify code quality and linting using ESLint:
```bash
npm run lint
```
Formatting is managed with Prettier config and Tailwind CSS sort plugin to ensure uniform utility class ordering.
