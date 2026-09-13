# Pintrest AI 📌✨

A modern, production-grade full-stack Pinterest clone featuring an **Express REST API**, **Cloudflare R2** edge storage with zero egress fees, **MongoDB**, and an **Editorial Magazine Grid** frontend built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS**.

---

## 🏗️ Architecture

```text
pintrest/
├── backend/                  # Express.js REST API
│   ├── config/              # MongoDB connection & Cloudflare R2 S3 client
│   ├── controllers/         # Auth, Post, and Upload controllers
│   ├── middlewares/         # Session auth guard & Multer memory storage
│   ├── models/              # Mongoose User and Post schemas
│   ├── routes/              # Modular Express API routers
│   ├── app.js               # Express application configuration
│   └── server.js            # Node HTTP server entrypoint
├── client/                   # React 19 Single Page Application
│   ├── src/
│   │   ├── components/      # Navbar, MasonryGrid, PinCard, PinModal, CreatePinModal, ProfileView, AuthModal
│   │   ├── services/api.ts  # Typed API client with direct-to-R2 upload pipeline
│   │   ├── types/           # TypeScript contracts for User, Post, Presign
│   │   ├── App.tsx          # Root state management & editorial layout
│   │   └── index.css        # Editorial design tokens, Playfair Display, Tailwind v4
│   └── vite.config.ts       # Vite configuration with API reverse proxy
├── DESIGN.md                # System-wide design tokens and visual rules
└── PRODUCT.md               # Product requirements and domain model
```

---

## ⚡ Key Features

- **Direct-to-R2 Upload Pipeline**: Browser requests presigned S3 URL from `/api/upload/presign`, streams binary directly to Cloudflare R2 edge storage, and registers metadata to MongoDB.
- **Editorial Magazine Grid UI**: Warm cream ground (`#faf8f4`), Playfair Display serif typography, hairline borders (`#e2ddd7`), and subtle hover interactions.
- **Full Authentication**: Session-based auth powered by Passport.js with persistent login states and optimistic likes.
- **Responsive Multi-Column Masonry**: Fluid column scaling from mobile (2 columns) to ultra-wide desktop (6 columns) with shimmer skeleton loaders.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js v18+
- MongoDB instance running locally or on MongoDB Atlas
- Cloudflare R2 account credentials (Bucket name, Account ID, Access Keys)

### 2. Environment Setup
Create `backend/.env` with:
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/pintrest
SESSION_SECRET=your_super_secret_session_key

R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_BUCKET_NAME=your_r2_bucket_name
R2_PUBLIC_URL=https://pub-xxxxxx.r2.dev
```

### 3. Run Development Servers
```bash
# Terminal 1: Backend API (port 3000)
npm run server

# Terminal 2: React Client (port 5173 with auto API proxy)
npm run client
```

