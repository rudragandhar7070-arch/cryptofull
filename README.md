# Crypto AI Trading Platform

A fullstack 3D crypto trading bot platform with a Node.js backend and a Three.js + GSAP frontend.

## Features

- **3D Bitcoin** — Scroll-driven centered animation with real Bitcoin logo texture
- **Live Prices** — Real-time BTC/ETH/SOL via Binance WebSocket
- **AI Chatbot** — Backend-powered chatbot at `/api/chat`
- **RGB Cursor** — Custom trailing cursor (desktop only)
- **3D Doge Mascot** — Camera-attached, cursor-tracking companion

## Quick Start

### 1. Install Node.js

Download and install Node.js from: https://nodejs.org/

### 2. Run the Server

Open a terminal in this folder and run:

```bash
node server.js
```

### 3. Open in Browser

Visit: **http://localhost:3000**

> No `npm install` is needed! The server uses only Node.js built-in modules (`http`, `fs`, `path`).

## Project Structure

```
crypto-platform/
├── server.js          # Node.js backend (zero dependencies)
├── package.json       # Metadata (optional, for deployment platforms)
├── README.md          # This file
└── public/
    └── index.html     # Complete frontend (HTML + CSS + JS, all-in-one)
```

## API Endpoints

| Method | Route          | Description                        |
|--------|----------------|------------------------------------|
| POST   | `/api/chat`    | AI chatbot — send `{ message }`    |
| POST   | `/api/connect` | Mock node/waitlist connection      |
| GET    | `/api/health`  | Health check (uptime, status)      |

## Deploying

### Render / Railway / Fly.io
1. Push this folder to a GitHub repo.
2. Connect to Render/Railway.
3. Set **Build Command**: _(leave empty)_
4. Set **Start Command**: `node server.js`
5. Done! It will deploy automatically.

### Vercel (Serverless)
Vercel requires converting `server.js` to serverless functions. Consider Render or Railway for the simplest deployment.
