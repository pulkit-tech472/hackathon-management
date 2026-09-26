# hackathon-management
# 🚀 Hackathon & Event Management Platform

A modern, full-stack event and hackathon management platform built with the **MERN / Next.js App Router** stack. It allows participants to register, create and join teams, and submit project details seamlessly with a sleek dark glassmorphism UI.

---

## 🌟 Key Features

* **🔐 Authentication & Role Management**: Secure user signup and login powered by **NextAuth.js** and **Bcrypt** password hashing. Supports roles like `PARTICIPANT` and `ORGANIZER`.
* **🎨 Modern UI/UX**: Custom dark-themed **Glassmorphism** interface designed for high aesthetic appeal and smooth navigation.
* **👥 Team Creation & Join System**: Dynamic endpoints to form teams, send join requests, and manage hackathon groups.
* **📊 Interactive Dashboard**: Clean central user dashboard to view ongoing hackathons, team statuses, and project submissions.
* **⚡ High Performance Database**: Powered by **Neon PostgreSQL** paired with **Prisma ORM** for ultra-fast and type-safe database queries.

---

## 🛠️ Tech Stack

* **Frontend**: [Next.js 14](https://nextjs.org/) (App Router), React, TypeScript, Inline Glassmorphism Styling
* **Backend**: Next.js API Routes, Node.js
* **Database**: [Neon Cloud PostgreSQL](https://neon.tech/)
* **ORM**: [Prisma](https://www.prisma.io/)
* **Authentication**: [NextAuth.js](https://next-auth.js.org/)
* **Security**: BcryptJS for password hashing

---

## 📂 Project Architecture

```text
src/
├── app/
│   ├── api/             # API routes for Authentication & Team operations
│   │   ├── auth/        # Register & NextAuth endpoints
│   │   └── teams/       # Team join and management routes
│   ├── dashboard/       # Protected user dashboard page
│   ├── login/           # User sign-in page
│   └── register/        # User registration page
├── lib/
│   ├── auth.ts          # NextAuth configuration
│   ├── prisma.ts        # Prisma client instance
│   └── validations.ts   # Request validations
└── prisma/
    └── schema.prisma    # PostgreSQL database schema
