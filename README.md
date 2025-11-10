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

#screenshots

<img width="1865" height="967" alt="Screenshot 2025-11-11 005938" src="https://github.com/user-attachments/assets/3b4ae5c7-74a2-49d0-a27a-0e51001a5826" />
