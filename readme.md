# SmartWall — The Design-Forward Room Paint Visualizer

SmartWall turns room repainting from a risky guess into a quick, confidence-building visual decision. Built for homeowners, renters, and design-minded buyers, the platform allows users to casually explore and visualize paint colors inside actual rooms without complex design workflows.

---

## 🏗️ Repository Architecture

This repository is organized as a monorepo containing both the frontend client and the backend server:

```text
smartwall/
├── client/              # React 19 + Vite 8 + Tailwind CSS v4 Frontend
│   ├── src/             # Application source code
│   └── package.json     # Frontend dependencies & scripts
├── server/              # Express JS Backend (Skeleton MVC Structure)
│   ├── config/          # Database & third-party configurations
│   ├── controllers/     # API request handlers
│   ├── model/           # Database schemas
│   ├── routes/          # API route definitions
│   └── package.json     # Backend dependencies
├── PRODUCT.md           # Core product positioning, principles, and accessibility
└── readme.md            # Repository overview (this file)
```

---

## 🖥️ Project Parts

### 1. Frontend Client ([client](file:///c:/Users/HP/OneDrive/Desktop/smartwall/client/README.md))
The user interface is built to be clean, premium, and highly responsive.
*   **Core Tech**: React 19, Vite 8, Tailwind CSS v4, Framer Motion, React Router DOM, React Hook Form, and Zod.
*   **Experience**: Complete with an interactive paint editor, custom mobile scroll walkthroughs, color collections exploration, and visualizer dashboards.
*   *For detailed info, check out the [Client README](file:///c:/Users/HP/OneDrive/Desktop/smartwall/client/README.md).*

### 2. Backend Server ([server](file:///c:/Users/HP/OneDrive/Desktop/smartwall/server/))
An Express-based MVC structure prepared to handle REST APIs for saving projects, color palettes, and user configurations.
*   *For database connection, CORS settings, and routes, check the configurations inside the `server/` directory.*

### 3. Product Vision & Design Principles ([PRODUCT.md](file:///c:/Users/HP/OneDrive/Desktop/smartwall/PRODUCT.md))
Our product principles emphasize high-fidelity visual clarity, WCAG 2.1 AA accessibility guidelines, and reduced-motion support.

---

## 🛠️ Quick Start

### 1. Clone the repository
Navigate into the workspace root.

### 2. Run the Frontend Client
```bash
cd client
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Run the Backend Server
```bash
cd server
npm install
# Startup script configuration can be run once entrypoints are defined
```

---

## 🎨 Branding & Product Guidelines
*   **Personality**: Modern, confident, and design-forward.
*   **Design**: Smooth animations (framer-motion) and clean typography. Avoid generic SaaS-style layouts.
*   **Accessibility**: Strong focus states, touch-friendly visual controls, and high readability for all types of users.
