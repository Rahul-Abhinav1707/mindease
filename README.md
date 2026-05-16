# MindEase

MindEase is a production-quality full-stack foundation for an AI powered mental wellness platform. This version intentionally focuses on setup, architecture, authentication, theme system, premium UI foundation, responsive navigation, and dashboard placeholders.

## Stack

- React 18 + Vite
- Tailwind CSS
- React Router v6
- Axios
- Framer Motion
- Shadcn-style UI primitives
- React Hook Form + Zod
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing

## Features Included

- Startup-quality landing page with hero, feature cards, testimonials, and footer
- Register and login flows with validation and error states
- Password strength requirements
- JWT session persistence with local/session storage support
- Protected dashboard route
- Dark and light theme with persistent preference
- Collapsible desktop sidebar
- Mobile bottom navigation and responsive drawer
- Profile dropdown and logout
- Dashboard placeholders for mood, wellness stats, activity, and quotes
- Express API with validation, auth middleware, error middleware, and secure defaults

## Not Included Yet

The following advanced modules are intentionally not implemented yet:

- Chatbot
- Analytics
- Meditation
- Journaling
- Affirmations
- Gamification

## Project Structure

```txt
src/
  animations/
  components/
  context/
  hooks/
  layouts/
  pages/
  routes/
  services/
  styles/
  utils/

server/
  config/
  controllers/
  middleware/
  models/
  routes/
  services/
  utils/
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB connection string and JWT secret.

4. Run the app:

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## API Endpoints

```txt
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/ai/guide
GET  /api/ai/history
GET  /api/journals
POST /api/journals
GET  /api/moods
POST /api/moods
GET  /api/activities
GET  /api/settings
PUT  /api/settings
```

## Environment Variables

```txt
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/mindease
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
VITE_API_URL=http://localhost:5000/api
GROQ_API_KEY=your-groq-api-key
GROQ_MODEL=llama-3.3-70b-versatile
```
