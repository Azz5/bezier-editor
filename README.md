# n-Degree Bézier Curve Editor

A React + Vite application for interactively creating, editing, and visualizing n-degree Bézier curves with a P5.js canvas.

## Features

- **Add / Remove Curves**  
  Create multiple Bézier curves; each curve has its own unique ID.

- **n-Point Control**  
  Dynamically add or remove control points in a modal form.

- **Drag & Snap**  
  Drag control points around on the canvas; points snap to nearby points across curves for precise alignment.

- **Resizable Canvas Container**  
  The editor sits inside a CSS-resizable `<div>`—drag its corner to adjust the drawing area.

- **Lightweight p5 Integration**  
  Uses the ES module build of p5.js (`p5.esm.js`) for smaller bundle size and better tree-shaking.

## Screenshots

![image](https://github.com/user-attachments/assets/18cc0907-e24e-4d67-a196-907ec61ca880)


## Getting Started

### Prerequisites

- Node.js ≥ 16  
- npm (or Yarn/Bun)

### Install

1. Clone this repo:
   ```bash
   git clone https://github.com/your-username/bezier-curve-editor.git
   cd bezier-curve-editor
   ```

2. Install dependencies:
  ```bash
  npm install
  # or
  yarn
  # or with Bun
  bun install
  ```

### Run Locally

```bash
npm run dev
# or
yarn dev
# or
bun run dev
```

### Build & Deploy
```bash
npm run build
# or
yarn build
# or
bun run build
```

The optimized production output will appear in the dist/ folder. Serve it on any static host (Netlify, Vercel, GitHub Pages, etc.).

### Project Structure

```
src/
├─ components/
│  └─ P5BezierEditor.tsx      # The main p5.js canvas editor
├─ styles/
│  └─ App.css                 # Global styles
├─ App.tsx                    # Main layout & curve-list + modal form
├─ main.tsx                   # React entrypoint
└─ vite.config.ts             # Vite configuration & p5 alias
```



