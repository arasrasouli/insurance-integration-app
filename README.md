# Teton Insurance Integration

Description

## Setup

Make sure to install dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## Environment Variables

```bash
npm i --save-dev @types/node
```

Copy `.env.example` → `.env` and fill in your tokens.

- `TETON_TOKEN`: API token for Teton
- `BEST_TOKEN`: API token for Best Insurance
- `NUXT_PUBLIC_TETON_BASE`: Base URL for Teton API
- `NUXT_PUBLIC_BEST_BASE`: Base URL for Best Insurance API
- `NUXT_PUBLIC_TETON_DEPARTMENT_ID`: Department ID (e.g. 72)
- `NUXT_PUBLIC_TETON_API_VERSION`: API version header

