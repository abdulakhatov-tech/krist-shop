# Krist E-Commerce shop

This project is an e-commerce online shop built using Next.js, Typescript, ShadCN, and Tailwind CSS for the frontend.

![Kris E-Commerce Online Shop](public/krist.png)

### Technologies Used
- Next.js: For server-side rendering and optimized performance.
- Typescript: Ensures type safety and better maintainability.
- ShadCN: Provides modern, pre-build UI components.
- Tailwind CSS: Utility-first styling for a clean and customizable UI.

### Project Structure
```
📦 project-root
├── 📂 components     # Reusable UI components (e.g., Button.tsx, ProductCard.tsx)
├── 📂 app            # Server and client components (if using App Router)
├── 📂 hooks          # Custom React hooks
├── 📂 lib            # Utility functions, API clients
├── 📂 store          # Zustand/Redux store (if using state management)
├── 📂 pages          # Page-based routing (if using Pages Router)
├── 📂 public         # Static assets
├── 📂 styles         # Tailwind CSS custom styles
└── 📜 README.md      # Project documentation
```

### Features
#### UI & Styling
- Uses shadcn/ui for pre-built UI components.
- Customizable Tailwind styles via tailwind.config.ts

#### Optimization Techniques
- next/image for optimized image handling.
- next/font for better font performance.
- Uses ISR, SSR, and SSG for optimized page rendering.
- Lazy loading for heavy components (e.g., product carousels).

#### State Management
- Local state: useState, useReducer.
- Global state: Zustand, Redux Toolkit, or React Context API.
- Server state: @tanstack/react-query for efficient API handling.

#### Authentication & Security
- next-auth for authentication (OAuth, credentials, etc.).
- Secure API routes using middleware.
- Input validation with zod.

#### E-commerce Features
- Product catalog with filters & sorting.
- Cart & checkout flow (Stripe/PayPal integration).
- User dashboard for order tracking.
- SEO-friendly pages using Next.js metadata handling.
- Web performance optimizations with Lighthouse audits.

### Getting Started
#### Installation
```
git clone https://github.com/abdulakhatov-tech/krist.git
cd ecommerce-shop
npm install
```
#### Running the Project
```
npm run dev
```
Then open http://localhost:3000 in your browser.