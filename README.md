# Pintrest_AI

A modern full-stack Pinterest clone built with Node.js, Express, MongoDB, and EJS.

## Features
- **User Authentication**: Secure registration and login using Passport.js with session persistence.
- **Pin & Image Uploads**: Upload media with custom captions powered by Multer and unique UUID filenames.
- **Profile Dashboard**: User profiles featuring personal pins and information.
- **Visual Feed**: Pinterest-style responsive image gallery grid.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (running locally or cloud cluster)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/L3NNX/Pintrest_AI.git
   cd Pintrest_AI
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` and configure your credentials:
   ```bash
   cp .env.example .env
   ```
4. Start the server:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.
