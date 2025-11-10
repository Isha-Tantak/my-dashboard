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
(0/1) = Zero or One
#Screenshots:
<img width="1865" height="967" alt="Image" src="https://github.com/user-attachments/assets/8e07d18c-e401-4fab-b928-f30e24200dc0" />
<img width="1913" height="950" alt="Image" src="https://github.com/user-attachments/assets/284375a1-fbb3-4318-9160-fa65dd16488d" />
<img width="1875" height="695" alt="Image" src="https://github.com/user-attachments/assets/104e280b-2e2d-4344-88e5-44de659371d9" />
<img width="1840" height="922" alt="Image" src="https://github.com/user-attachments/assets/5ae4fc49-99b7-4f8d-8bc8-bcf7948266e7" />
