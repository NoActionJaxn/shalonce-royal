# Shalancé Royal

The official website for Shalancé Royal — professional wrestler, musician, and media personality. The site features two sides: **Side A** (wrestling) and **Side B** (music), each with their own layout, pages, and content. It also includes an integrated storefront powered by Stripe.

## Features

- Dual-site architecture (Side A / Side B) with shared layout system
- Event calendar and upcoming event listings
- Match archive with individual match pages
- Photo gallery
- Contact forms for wrestling bookings, music performances, and media appearances
- Storefront with shopping cart and Stripe Embedded Checkout
- Server-side rendering with dynamic content from Sanity CMS
- Adaptive light/dark header with scroll-aware transparency

## Tech Stack

- **Framework:** [React Router](https://reactrouter.com/) v7 (SSR)
- **Language:** TypeScript
- **Bundler:** [Vite](https://vite.dev/) v7
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
- **CMS:** [Sanity](https://www.sanity.io/) (headless, GROQ queries)
- **Payments:** [Stripe](https://stripe.com/) (Products API, Embedded Checkout)
- **Calendar:** react-big-calendar
- **Forms:** react-hook-form
- **Rich Text:** @portabletext/react

## Getting Started

### Prerequisites

- Node.js 18+
- A Sanity project with content configured
- A Stripe account with products created

### Installation

```bash
# Clone the repo
git clone https://github.com/NoActionJaxn/shalonce-royal.git
cd shalonce-royal

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SANITY_PROJECT_ID=your_sanity_project_id
VITE_SANITY_DATASET=your_sanity_dataset
VITE_SANITY_API_VERSION=2025-12-29

STRIPE_SECRET_KEY=your_stripe_secret_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Type Checking

```bash
npm run typecheck
```

## Building for Production

```bash
npm run build
npm start
```

## Docker

```bash
docker build -t shalonce-royal .
docker run -p 3000:3000 shalonce-royal
```

## Project Structure

```
app/
├── components/     # Reusable UI components
├── constants/      # Sanity GROQ queries
├── context/        # React context (Cart)
├── hooks/          # Custom hooks
├── lib/            # Sanity & Stripe client setup
├── routes/
│   ├── home.tsx    # Landing page
│   ├── side-a/     # Wrestling site routes
│   └── side-b/     # Music site routes
├── types/          # TypeScript types
└── util/           # Helper functions
```
