# 💰 Finance Tracker

A personal finance tracking app built with Angular 17+ standalone components, Signals, and modern reactive patterns. Track income and expenses, filter transactions, and view analytics — all with real-time computed updates.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Angular 17+ | Framework with standalone components |
| TypeScript | Type safety and developer experience |
| SCSS | Component-scoped styling with CSS custom properties |
| Signals | Fine-grained reactivity without RxJS complexity |
| Reactive Forms | Validated, testable form logic |
| Angular Router | Client-side navigation with lazy loading |

---

## Features

- **Dashboard** — Summary cards (income, expense, balance) with live computed totals
- **Add Transactions** — Reactive form with validation (amount, category, type, date, description)
- **Ledger** — Full transaction history with type filtering and delete
- **Analytics** — Category breakdown with top spenders/earners
- **Custom Directive** — `appHighlightTransaction` applies income/expense color coding
- **Custom Pipe** — `categoryIcon` maps categories to emojis
- **Lazy Loading** — Analytics chunk loads on-demand (verify in DevTools → Network)

---

## Architecture

src/app/
├── core/                    # Singleton services, models
│   ├── models/
│   │   └── transaction.model.ts
│   └── services/
│       └── transaction.service.ts
├── features/                # Page-level components
│   ├── dashboard/
│   ├── ledger/
│   └── analytics/
├── shared/                  # Reusable directives, pipes
│   ├── directives/
│   │   └── highlight-transaction.directive.ts
│   └── pipes/
│       └── category-icon.pipe.ts
├── app.component.ts          # Root shell with router outlet
├── app.config.ts             # App providers
└── app.routes.ts             # Route map with lazy loading
plain


### Key Design Decisions

| Decision | Why |
|----------|-----|
| **Signals over RxJS** | Simpler mental model, automatic dependency tracking, no subscription cleanup |
| **Standalone components** | Less boilerplate, modern Angular default, matches industry practice |
| **Reactive Forms** | Validation logic in testable TypeScript, not scattered HTML attributes |
| **Feature-based folders** | Self-contained domains, scalable as the app grows |
| **CSS custom properties** | Single source of truth for colors, spacing, shadows |

---

## Getting Started

```bash
# Clone
git clone https://github.com/exy-99/finance-tracker
cd finance-tracker

# Install
npm install

# Run
ng serve

# Navigate to http://localhost:4200

