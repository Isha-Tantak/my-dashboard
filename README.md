#  Analytics Dashboard + Chat with Data

A full-stack analytics dashboard built with **Next.js, Prisma, and Supabase**.

# Features
- Interactive Analytics Dashboard  
- Dynamic charts (Recharts)  
- Invoices table with search  
- Mock "Chat with Data" AI interface  
- PostgreSQL (Supabase) + Prisma ORM  

###  Tech Stack
- Next.js 16 (TypeScript)
- TailwindCSS + shadcn/ui
- PostgreSQL (Supabase)
- Prisma ORM

###  How to Run
```bash
npm install
npx prisma generate
npm run dev
## ER Diagram / Schema (Text Format)

Vendor (1) ───────< (M) Invoice >─────── (M) LineItem
      │                        │
      │                        └─────── (M) Payment
      │
      └───────────────────── (1) Customer

Document (1) ───── (0/1) Invoice

Legend:
(1)  = One
(M)  = Many
(0/1) = Zero or One!

