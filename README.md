# Insurance Integration App

This project is a training application that integrates hospital fall incident monitoring data with insurance APIs to enable insurance claims submission.  
Built with **Nuxt 3 + Vue 3**, it follows a clean domain-driven structure.

## Architecture Overview

- **entities/** → Models, DTOs, Types, Validations and mappers (domain layer)  
- **features/** → Business logic grouped by feature (fall, insurance, claim)  
- **server/api/** → API handlers (Nuxt server routes, upstream integration)  
- **shared/** → Utilities like cache system and error handling, libraries including helpers, and shared types or models
- **test/** → Unit tests (Vitest)


### 1. API Layer
- Located in `server/api/`.
- Handles requests from frontend and proxies to upstream APIs (**Hospital / Best Insurance**).
- Centralizes **error handling**, **env-based configuration**, and **response normalization**.
- Uses a **`fetchWithRetry` utility** for resilience against flaky upstream APIs:
  - Supports retries with exponential backoff.
  - Cancels requests with a timeout to prevent hanging.
  - Especially useful when fetching claim types, where intermittent upstream errors were resolved by retrying.
- Includes a **mock API layer** under `server/api/mock-api/`:
  - Reads from static JSON files in `server/data/`.
  - Provides endpoints for **falls**, **insurance**, and **claims**.
  - Useful for **local development** when external APIs are unavailable.
  - Mock APIs mimic real endpoints (e.g., `/api/departments/:id/falls`, `/api/insurance/claim-types`, `/api/insurance/claims`) and return deterministic responses with proper status codes.



### 2. Domain Services
- Located in `features/*/service/`.
- Encapsulate API calls and business rules.
- Use **DTO ↔ Model mappers** from `entities/` to keep domain clean.
- Example: `ClaimService.typeList()` → fetches claim types and maps to models.

### 3. Composables
- Located in `features/*/composable/`.
- Provide reactive state, loading/error flags, and call services.
- Designed for UI consumption.
- Example: `useClaim()` → manages fetching claim types and submitting claims.

**Flow:**  
`UI → Composable → Service → API → Upstream` 

## UI

- Built on **PrimeVue components** (Dialog, Button, Select, DataTable, etc.).
- Follows a **3-level UI integration approach**:
  1. **Base UI components** – generic, reusable elements (e.g. `AppDataTable.vue`).
  2. **Feature-specific UI wrappers** – adapt base components for a domain (e.g. `FallDataTable.vue` built on top of `AppDataTable`).
  3. **Page-level usage** – final composition in pages or dialogs (e.g. Fall list page using `FallDataTable`).

This layering keeps the UI **modular, reusable, and easy to maintain**.

Workflows are **dialog-driven**:
- Fall list → Fall details → Claim submission form  
- Conditional rendering manages the flow instead of separate navigation pages.


### Error Handling Service
The Error Handling Service provides a centralized, type-safe way to manage API errors in a Nuxt application. It uses TypeScript enums (ErrorCategory and ErrorKeys) and a structured ErrorMessages object to define HTTP error codes and messages. Integrated with i18next for multilingual support and h3's createError for Nuxt-compatible error responses, it ensures consistent error handling across server routes. The service is tested with Vitest to verify error behavior. Files are organized under shared/utils/error/ for modularity.

### Cache Mechanism

- Implemented in `shared/utils/cacheFetcher.ts` with **Pinia** store.  
- Stores API results by **endpoint URL key** with TTL (time-to-live).  
- Services use `cacheFetch(key, fetcher)`:
  - If cached and fresh → return cached result  
  - Else → call API, store in cache, then return  

This improves resilience (use cached data if API fails) and reduces redundant network calls.

---

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

- `HOSPITAL_TOKEN`: API token for Hospital
- `BEST_INSURANCE_TOKEN`: API token for Best Insurance
- `NUXT_PUBLIC_HOSPITAL_BASE`: Base URL for Hospital API
- `NUXT_PUBLIC_BEST_INSURANCE_BASE`: Base URL for Best Insurance API
- `NUXT_PUBLIC_HOSPITAL_DEPARTMENT_ID`: Department ID (e.g. 72)
- `NUXT_PUBLIC_API_VERSION`: API version header

