# Pintrest_AI

A modern full-stack Pinterest clone built with **React 19**, **Node.js**, **Express**, **Cloudflare R2**, and **MongoDB**.

## Features
- **Modern React 19 Frontend**: Responsive Pinterest multi-column masonry grid with skeleton placeholders and optimistic like toggles.
- **Pin Detail Modals**: High-resolution image preview and interaction modal without losing feed scroll position.
- **Cloudflare R2 Storage**: Direct-to-cloud presigned binary uploads with 10GB free tier and zero egress bandwidth fees.
- **REST API Architecture**: Clean MVC architecture with dedicated models, controllers, and middlewares.
- **User Authentication**: Secure session-based authentication with Passport.js.
- **Profile Dashboard**: User profiles featuring created pins and creator bio.

## Project Structure
```text
Pintrest/
├── client/              # React 19 + TypeScript + Tailwind CSS v4 SPA
├── config/              # MongoDB connection & Cloudflare R2 S3 client
├── controllers/         # Auth, Post, and Upload business logic
├── middlewares/         # Auth guard & Multer memory upload filters
├── models/              # User and Post Mongoose schemas
├── routes/              # Modular Express REST API routes
└── server.js            # Node.js HTTP server entrypoint
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (running locally or cloud cluster)
- Cloudflare R2 account (free tier)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/L3NNX/Pintrest_AI.git
   cd Pintrest_AI
   ```
2. Install backend & client dependencies:
   ```bash
   npm install
   cd client && npm install && cd ..
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in your Cloudflare R2 credentials:
   ```bash
   cp .env.example .env
   ```
4. Start development servers:
   ```bash
   # Terminal 1: Backend API (Port 3000)
   npm start

   # Terminal 2: React Frontend (Port 5173)
   npm run client
   ```
   Open [http://localhost:5173](http://localhost:5173) to view the application.
