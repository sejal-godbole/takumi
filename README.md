# ⚡ Takumi – AI Component Generator

![Next.js 16](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Clerk Auth](https://img.shields.io/badge/Clerk_Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

**Takumi** is a robust SaaS platform that leverages Generative AI to convert natural language prompts into production-ready, interactive React components. Built to accelerate frontend development, it combines the power of LLMs with a real-time sandboxed preview environment.

---

## 📸 Screenshots

| **AI Dashboard** | 
|:---: |
| ![Dashboard Interface](./screenshots/dashboard.png) |
| *Professional IDE-like interface with Monaco Editor* |

| **Live Preview** |
|:---:|
| ![Live Preview](./screenshots/preview.png) |
| *Real-time rendering using Sandpack* |

| **Authentication** | 
|:---:|
| ![Login Page](./screenshots/login.png) | 
| *Secure Login via Clerk* | 

---

## 🚀 Key Features

* **✨ Text-to-UI Generation:** Uses **Google Gemini 2.5 Flash** to generate React components (JSX), Zod validation schemas, and custom hooks from simple text prompts.
* **🛡️ Secure Live Preview:** Integrates **Sandpack (by CodeSandbox)** to render generated code in a safe, isolated browser environment.
* **💻 Full-Featured Code Editor:** Embedded **Monaco Editor** (VS Code engine) for syntax highlighting, editing, and formatting.
* **🔐 Authentication & User Management:** Secure sign-up/login flows powered by **Clerk**, allowing users to save their component history.
* **💾 Database Persistence:** Uses **Prisma ORM** with **PostgreSQL** to store user prompts and generated code for future retrieval.
* **📦 One-Click Export:** Download projects as a configured `.zip` file or copy individual files to clipboard.
* **🎨 Dynamic Theming:** Users can customize component styling (Border Radius, Primary Colors) via a dedicated settings panel.

---

## 🛠️ Tech Stack

### **Frontend**
* **Framework:** Next.js 16 (App Router)
* **Styling:** Tailwind CSS, Framer Motion, Lucide React
* **Editor:** Monaco Editor (`@monaco-editor/react`)
* **Preview:** Sandpack (`@codesandbox/sandpack-react`)

### **Backend & AI**
* **AI Model:** Google Gemini API (`gemini-1.5-flash`)
* **Database:** PostgreSQL (via Neon/Supabase)
* **ORM:** Prisma
* **Auth:** Clerk

---

## 🏗️ Architecture

1.  **Prompt Engineering:** The backend constructs a strict system prompt enforcing "No External Props" and specific library imports (Lucide, Framer Motion) to ensure the code runs immediately without errors.
2.  **JSON Stream:** The AI returns a structured JSON object containing `{ jsx, schema, hook }`.
3.  **Virtual File System:** The frontend parses this JSON and mounts it into Sandpack's virtual file system as `/App.js`, triggering an instant live render.
4.  **Sync to DB:** Successful generations are asynchronously pushed to the Postgres database via Prisma, linked to the user's Clerk ID.

---

## ⚡ Getting Started Locally

Follow these steps to run Takumi on your machine.

### 1. Clone the repository
```bash
git clone [https://github.com/sejal-godbole/takumi.git](https://github.com/sejal-godbole/takumi.git)
cd takumi
