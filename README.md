# house-price-predict-ml-client

Hermes Valuate is an anti AI-slop real estate valuation client built with **Next.js 16+**, **Tailwind CSS v4**, **shadcn UI** patterns, and **pnpm**. It interfaces with the machine learning backend service to predict property prices in real time across 13 structural variables.

---

## Features

- **Random Forest ML Integration**: Direct inference via FastAPI endpoint (`POST /predict`) with live health check (`GET /health`).
- **Resilient Fallback Engine**: Seamless analytical regression benchmark mode if the local FastAPI server is offline.
- **Quick Test Scenarios**: One-click preset scenarios (Waterfront Contemporary, Downtown Skyline Flat, Suburban Craftsman, Historic Brick Townhouse).
- **Interactive Workbench**: Dual input modes for house age / year built, living area, lot size, condition, heating, and neighborhood tiers.
- **Financial Intelligence**: Price-per-square-foot calculation, model confidence range (+/- MAE $36,521), and 30-year carrying cost estimator.
- **Design System & Palette**: Built on the Hermes launch edition palette (Deep Midnight `#060814`, Electric Cobalt `#0000F2`, Cyan Glow `#00D2FF`, and Crisp High-Contrast Light `#EDEDF2`).

---

## Environment Configuration

Create a `.env.local` file (or copy `.env.example`):

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Getting Started

Install dependencies using pnpm:

```bash
pnpm install
```

Start the local development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```
