# Ajackus Blogs — AI Powered Blog Editor

A full-stack blogging platform that enables users to create, edit, and enhance blog content using AI assistance. The application demonstrates modern web development practices including REST API design, secure environment configuration, and full-stack deployment workflows.

---

## Overview

Ajackus Blogs is an AI-assisted blogging application designed to streamline content creation. Users can write blogs manually or generate content using AI directly within the editor interface.

The project follows a modular frontend–backend architecture with secure environment variable management.

---

## Technology Stack

### Frontend

* React (Vite)
* JavaScript (ES6+)
* CSS

### Backend

* Node.js
* Express.js
* SQLite Database
* REST API Architecture

### AI Integration

* Google Gemini API

### Deployment

* Vercel (Frontend Hosting)
* Environment Variables for secure configuration

---

## Project Structure

```
Ajackus-Blogs
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── db
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── .env.example
├── .gitignore
└── README.md
```

---

## Local Setup

### 1. Clone Repository

```
git clone https://github.com/YOUR_USERNAME/Ajackus-Blogs.git
cd Ajackus-Blogs
```

---

### 2. Install Backend Dependencies

```
cd backend
npm install
```

Create environment configuration:

Copy `.env.example` and rename it to `.env`.

Update values:

```
GEMINI_API_KEY=your_api_key_here
PORT=5000
```

Start backend server:

```
npm start
```

Backend runs at:

```
http://localhost:5000
```

---

### 3. Install Frontend Dependencies

```
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## Environment Variables

Sensitive configuration values are excluded from version control.

Example `.env.example`:

```
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

### Production Deployment

Add the same environment variables inside:

Vercel Dashboard → Project Settings → Environment Variables

---

## Features

* Blog editor interface
* AI-assisted content generation
* Blog CRUD operations
* Modular backend architecture
* Secure environment configuration
* Fast React-based frontend

---

## API Endpoints

### AI Routes

```
POST /api/ai/generate
```

### Blog Routes

```
GET    /api/blogs
POST   /api/blogs
PUT    /api/blogs/:id
DELETE /api/blogs/:id
```

---

## Deployment

The frontend is deployed using Vercel. Environment variables are configured through the Vercel dashboard instead of committing `.env` files to the repository.

---

## Learning Outcomes

* Full-stack application architecture
* REST API design
* AI API integration
* Secure environment variable management
* Git and GitHub workflow practices
* Deployment configuration

---

## Future Improvements

* User authentication
* Rich text editor support
* Cloud database integration
* Blog publishing workflow
* SEO optimization

---

## License

This project is available for educational and portfolio purposes.
