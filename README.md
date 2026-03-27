# SilvrStns

Minimal ecommerce storefront for a gothic jewelry brand. Built with Next.js, React, Tailwind CSS, and Stripe Checkout.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + TypeScript
- **Tailwind CSS v4**
- **Stripe Checkout** (server-side session creation)
- **Google Analytics 4** + **Microsoft Clarity**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file with:

```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_clarity_id
```

Optional (used as fallback for Stripe redirect URLs):

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Deployment

Deploy to Vercel. No extra configuration needed beyond setting environment variables in the Vercel dashboard.
