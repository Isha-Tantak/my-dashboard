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

<img width="1865" height="967" alt="Screenshot 2025-11-11 005938" src="https://github.com/user-attachments/assets/7c1787cc-05de-45ac-9917-cb57620a57f6" />

<img width="1865" height="967" alt="Screenshot 2025-11-11 005938" src="https://github.com/user-attachments/assets/c0dfc7d0-808c-4497-85c7-7a59090bfb00" />


<img width="1913" height="950" alt="Screenshot 2025-11-11 005954" src="https://github.com/user-attachments/assets/db39dd2d-c5cb-468b-b7d9-3aeaec6e8f3c" />




<img width="1875" height="695" alt="Screenshot 2025-11-11 010009" src="https://github.com/user-attachments/assets/db9f6812-eae2-4c75-ba49-e611f3008b27" />

