# VIDORA EVENTS — Luxury Weddings & Event Planners Sri Lanka

> **"Beautiful Weddings & Unforgettable Celebrations in Sri Lanka."**  
> *From grand Poruwa ceremonies and seaside weddings to surprise proposals and private parties. We take care of every detail so you can enjoy your special day without any stress.*

A production-ready, full-stack luxury wedding and event planning web application and management system built for the Sri Lankan event market. Designed with clean, elegant typography, warm Sri Lankan hospitality, and practical event features.

---

## Table of Contents

1. [Project Overview & Sri Lankan Features](#1-project-overview--sri-lankan-features)
2. [Technology Stack](#2-technology-stack)
3. [Prerequisites](#3-prerequisites)
4. [Project Directory Architecture](#4-project-directory-architecture)
5. [Installation & Setup](#5-installation--setup)
6. [Environment Variables](#6-environment-variables)
7. [PostgreSQL Database Setup](#7-postgresql-database-setup)
8. [Prisma Migrations & Seeding](#8-prisma-migrations--seeding)
9. [Secure Initial Administrator Provisioning](#9-secure-initial-administrator-provisioning)
10. [Running in Development](#10-running-in-development)
11. [Running Tests](#11-running-tests)
12. [Production Build](#12-production-build)
13. [Sri Lankan Contact Details & Customization](#13-sri-lankan-contact-details--customization)

---

## 1. Project Overview & Sri Lankan Features

### Public Website
- **Warm, Elegant Home Page:** Features popular Sri Lankan event categories (Poruwa ceremonies, homecomings, surprise beach proposals, birthday parties, corporate dinner dances), easy 4-step planning process, real client feedback, and direct WhatsApp hotline (`+94 77 123 4567`).
- **Relatable Services:**
  1. *Weddings, Poruwa & Homecoming Receptions:* Custom Poruwa design, traditional Magul Bera drummers, Jayamangala Gatha, fresh jasmine & lotus floristry, reception band & DJ coordination.
  2. *Surprise Marriage Proposals:* Secret beach setups in Weligama & Bentota with traditional brass oil lamps (pāna), private candlelight dinner, and hidden photographers.
  3. *Birthday Parties & Milestone Celebrations:* 21st, 50th, and family milestone celebrations with custom themes, BBQ stations, and live entertainment.
  4. *Anniversaries & Family Get-Togethers:* Warm reunions and jubilees held at colonial villas or private Colombo gardens.
  5. *Corporate Functions & Annual Dinner Dances:* Company awards nights, LED stage fabrication, live bands, and banquet logistics.
  6. *Private Beach & Villa Parties:* Private villa buyouts, catamaran charters in Mirissa, and Yala luxury safari banquets.
- **Past Events Portfolio:** Features relatable weddings and events at Galle Fort, Cape Weligama, Bentota Beach, Colombo 07, Colombo Port City, and Nuwara Eliya tea estates.
- **Easy Sri Lanka Inquiry Form:** Allows guests and diaspora couples (Australia, UK, Canada, Dubai, etc.) to request quotes with phone/WhatsApp number, preferred destination, and budget tiers in both Sri Lankan Rupees (LKR) and USD.
- **Common Questions (FAQ):** Covers overseas planning via WhatsApp, Poruwa traditions, best weather seasons for beach weddings (December to April), and honest vendor pricing.

### Protected Admin Dashboard
- **Secure Staff Login:** HTTP-only cookies with bcrypt password security and brute-force protection.
- **Inquiry Management:** Overview counters (`New`, `Contacted`, `In Discussion`, `Confirmed`, `Closed`), search by name, email, or destination, and instant status updates.
- **Internal Staff Notes:** Private staff notes thread attached to each inquiry for notes on budget discussions and phone conversations.
- **Portfolio Management:** Add, edit, draft, and publish wedding and event photos directly through the UI.

---

## 2. Technology Stack

- **Frontend:** React 18 with Vite, TypeScript
- **Styling:** Tailwind CSS with warm ivory, soft white, charcoal, muted taupe, and champagne gold
- **Typography:** Cormorant Garamond (Serif) & Inter (Sans-serif)
- **Icons & Animations:** Lucide React, Framer Motion
- **Form Management:** React Hook Form with Zod validation
- **Backend:** Node.js, Express, TypeScript (ESM)
- **Database & ORM:** PostgreSQL with Prisma ORM
- **Security:** Helmet, CORS, HTTP-only secure cookies, express-rate-limit, bcryptjs
- **Testing:** Vitest, Supertest, React Testing Library, jsdom

---

## 3. Prerequisites

- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher
- **PostgreSQL:** v14 or higher (or Docker)

---

## 4. Installation & Setup

1. Open your terminal in the project directory:
   ```bash
   cd "/Users/ranu/Downloads/Luxury Event Planning"
   ```

2. Install all dependencies across client and server:
   ```bash
   npm install
   ```

---

## 5. PostgreSQL Database Setup

### Option A: Using Docker (Fastest)
```bash
docker compose up -d
```
Starts a PostgreSQL 16 container with database `aurelia_events`, user `aurelia_user`, and password `aurelia_secure_password` on port `5432`.

### Option B: Local PostgreSQL (Homebrew)
```bash
brew services start postgresql@14
psql -d postgres -c "CREATE USER aurelia_user WITH PASSWORD 'aurelia_secure_password' CREATEDB;"
psql -d postgres -c "CREATE DATABASE aurelia_events OWNER aurelia_user;"
```

---

## 6. Prisma Migrations & Seeding

1. Generate Prisma Client:
   ```bash
   npm run prisma:generate
   ```

2. Create tables in PostgreSQL:
   ```bash
   npm run prisma:push --workspace=server
   ```

3. Seed the database with Sri Lankan services, past events, testimonials, and FAQs:
   ```bash
   npm run prisma:seed
   ```

---

## 7. Secure Admin Account Setup

Create your administrative account:
```bash
npm run admin:create
```
Enter your email (e.g. `director@aureliaevents.lk`), password (min 8 chars), and name.

---

## 8. Running the Application

Start both the client and server concurrently:
```bash
npm run dev
```

- **Website:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5001](http://localhost:5001)
- **Staff Admin Login:** [http://localhost:5173/admin/login](http://localhost:5173/admin/login)

---

## 9. Running Tests

```bash
# Run all tests
npm run test

# Run backend API tests only
npm run test --workspace=server

# Run frontend form tests only
npm run test --workspace=client
```

---

## 10. Sri Lankan Contact Details & Customization

- **Colombo Office:** Ward Place, Cinnamon Gardens, Colombo 07
- **Galle Office:** Church Street, Galle Fort
- **Hotline / WhatsApp:** `+94 77 123 4567` / `+94 11 268 9400`
- **Email:** `hello@aureliaevents.lk`
