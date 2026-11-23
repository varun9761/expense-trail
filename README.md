# ExpenseTrail

ExpenseTrail is a responsive personal finance dashboard built with HTML, CSS, Vanilla JavaScript, and Chart.js. It helps users manage income, expenses, budgets, recurring entries, category-level spending, and financial insights through a clean single-page interface.

The project currently runs fully on the client side and stores user data locally in the browser using `localStorage`, which makes it easy to run, demo, and extend without a backend.

## Deployment & Continuous Delivery

This project is configured for continuous deployment on **Vercel** connected directly with **GitHub**:

- **Repository**: [github.com/varun9761/expense-trail](https://github.com/varun9761/expense-trail)
- **Automatic Redeployment**: Any push to the `main` branch automatically triggers an updated deployment on Vercel.

```bash
# Workflow for future updates:
git add .
git commit -m "Update feature or style"
git push origin main
```

## Project Highlights

- Local sign up and sign in flow
- Guided onboarding experience for first-time users
- Income and expense tracking
- Monthly budget management
- Category-wise budget tracking
- Custom category creation
- Recurring income and recurring expense management
- Date-range filtering
- Search and type-based filtering
- JSON import/export
- CSV export
- Doughnut chart analytics using Chart.js
- Responsive modern UI with light/dark theme support

## Demo Scope

ExpenseTrail currently behaves like a polished frontend prototype or MVP:

- Authentication is local-only and stored in the browser
- All user profiles are stored in `localStorage`
- No database or cloud sync is connected yet
- No real banking or payment APIs are integrated yet

That makes it ideal for:

- portfolio/demo projects
- frontend practice
- UI/UX experiments
- future backend/API integration

## Tech Stack

### Core Technologies

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Chart.js

### Browser APIs Used

- Local Storage API
- FileReader API
- Blob API
- `crypto.randomUUID()`

### Frontend Concepts Used

- Responsive Web Design
- Client-side state management
- Modal-based workflows
- Form handling and validation
- Data filtering and grouping
- Dynamic DOM rendering
- Theming with CSS variables

## Features

### 1. Local Authentication

Users can create an account and sign in using a local client-side flow.

Current behavior:

- account records are stored in browser `localStorage`
- session is persisted locally
- multiple local users can exist on the same browser

### 2. Onboarding Flow

First-time users are guided through a multi-step onboarding setup to configure:

- monthly budget
- monthly income baseline
- preferred categories
- primary financial goal
- recurring expenses

This helps personalize the dashboard immediately after sign up.

### 3. Dashboard Overview

The main dashboard displays:

- net balance for the current period
- total income
- total expenses
- monthly budget usage
- remaining budget
- total entries
- top expense category
- recurring item count

### 4. Entry Management

Users can create and manage financial entries with:

- type: income or expense
- name
- amount
- category
- date
- payment method
- notes

Entries can be:

- created
- edited
- deleted
- filtered
- grouped by month

### 5. Category Management

The app includes built-in categories and also allows users to create custom categories dynamically.

Example categories:

- Food
- Transport
- Utilities
- Shopping
- Entertainment
- Healthcare
- Education
- Travel
- Housing
- Bills
- Personal
- Savings
- Salary
- Freelance
- Investment
- Other

Users can also add their own categories such as:

- Fitness
- Gifts
- Pets

### 6. Category Budgets

Users can assign budgets to individual categories and view:

- actual spend vs category budget
- visual progress bar
- percent budget consumed

This makes the app more practical than a single overall monthly budget.

### 7. Recurring Transactions

Users can create recurring entries such as:

- rent
- salary
- subscriptions
- SIP contributions
- gym membership

Supported recurrence types:

- monthly
- weekly

### 8. Filters and Search

The dashboard supports:

- type filter
- category filter
- date range filter
- custom date range
- keyword search

This helps users analyze specific time windows and expense patterns.

### 9. Analytics

Chart-based analytics are displayed using Chart.js:

- spending breakdown by category
- interactive doughnut chart
- dynamic legend and tooltip formatting

### 10. Data Import and Export

Supported data operations:

- JSON export
- JSON import
- CSV export

This allows:

- data backup
- demo/sample data loading
- portability
- reporting support

## File Structure

```text
expense trail/
├── index.html
├── style.css
├── script.js
├── sample-expense-trail-june-2026.json
├── READ-ME.txt
└── README.md
```

### File Responsibilities

#### `index.html`

Contains the full UI structure for:

- auth screen
- onboarding flow
- dashboard
- entry modal
- category budget modal
- recurring entry modal

#### `style.css`

Contains:

- responsive layout
- theme system
- cards and glassmorphism styling
- modal styling
- onboarding layout
- mobile behavior
- scroll fixes

#### `script.js`

Contains:

- authentication logic
- onboarding logic
- local storage persistence
- dashboard state handling
- entry CRUD logic
- recurring item logic
- category budget logic
- import/export logic
- chart rendering

#### `sample-expense-trail-june-2026.json`

A realistic sample dataset for testing:

- multiple income and expense entries
- recurring items
- category budgets
- custom categories

## How It Works

### User Data Model

Each account stores a user data object with:

- name
- email
- monthly budget
- categories
- category budgets
- entries
- recurring items
- goal
- onboarding status

### Entry Model

Each financial entry stores:

- `id`
- `name`
- `amount`
- `type`
- `category`
- `date`
- `paymentMethod`
- `notes`

### Recurring Model

Each recurring item stores:

- `id`
- `name`
- `amount`
- `category`
- `type`
- `frequency`
- `startDate`

## Getting Started

### Option 1: Open Directly

Since this is a static frontend project, you can run it by simply opening:

```text
index.html
```

in your browser.

### Option 2: Use a Local Server

You can also serve it with any lightweight local server for a cleaner dev workflow.

Examples:

```bash
# Python
python -m http.server 5500
```

```bash
# Node
npx serve .
```

Then open:

```text
http://localhost:5500
```

## Sample Data

You can test the app quickly using:

[`sample-expense-trail-june-2026.json`](./sample-expense-trail-june-2026.json)

Import flow:

1. Sign in or create an account
2. Open the dashboard
3. Click `Import`
4. Select the sample JSON file

This will populate:

- entries
- budgets
- categories
- recurring items
- goal data

## Current Limitations

Because the app is fully frontend and local-only right now, it has some expected limitations:

- no real backend authentication
- no encrypted password storage
- no cloud sync across devices
- no real bank integration
- no OCR for receipts
- no push notifications
- recurring entries are tracked, but not auto-posted into the ledger
- no role-based or enterprise user management

## Why This Project Is Good for a Portfolio

ExpenseTrail is a strong frontend portfolio project because it demonstrates:

- real-world dashboard design
- form-heavy UI flows
- client-side state handling
- data modeling
- local persistence
- dynamic rendering
- chart integration
- filtering logic
- responsive design
- product thinking beyond CRUD

## Suggested Future Improvements

### 1. Backend and Database

To make the project production-ready:

- add a real backend
- store users in a database
- use secure password hashing
- support account recovery and email verification

Good choices:

- Node.js + Express
- Next.js API routes
- Supabase
- Firebase
- PostgreSQL / MongoDB

### 2. Cloud Authentication

Replace local-only auth with:

- Firebase Authentication
- Supabase Auth
- Auth0
- Clerk

Benefits:

- secure sign-in
- real session management
- device sync
- password reset
- social login

### 3. Cloud Data Sync

Store user data in:

- Firebase Firestore
- Supabase Postgres
- MongoDB Atlas
- PostgreSQL

Benefits:

- cross-device access
- backup
- real user accounts
- scalable storage

### 4. Banking / Finance APIs

For real-world finance workflows, you can integrate:

- Plaid
- Tink
- TrueLayer
- Razorpay route/account data where relevant
- Open Banking APIs depending on geography

Possible features:

- automatic transaction import
- bank account sync
- transaction categorization
- balance fetch
- spending trends

### 5. AI Features

This project has strong potential for AI integration.

#### AI Features You Can Add

- smart transaction categorization
- monthly financial summaries
- overspending alerts
- savings recommendations
- budgeting suggestions
- anomaly detection
- natural language finance assistant
- receipt OCR + expense extraction

#### Example AI Use Cases

1. Auto-categorization
   - classify new expenses into categories using an LLM or ML model

2. Financial Summary Generator
   - generate “You spent 18% more on dining this month than last month”

3. Smart Recommendations
   - suggest budget reductions in overspent categories

4. Natural Language Chat
   - “How much did I spend on food this month?”
   - “Show my top 3 expense categories in June”

5. Receipt Parsing
   - upload receipt image
   - extract merchant, amount, date, and line items

#### AI + OCR + API Stack Ideas

- OpenAI API
- Google Gemini API
- Claude API
- OCR.Space API
- Google Vision API
- Tesseract OCR

### 6. Notification System

Useful integrations:

- email reminders
- SMS reminders
- push notifications
- monthly summary alerts
- budget threshold warnings

Possible services:

- Firebase Cloud Messaging
- OneSignal
- Twilio
- SendGrid
- Resend

### 7. Recurring Entry Automation

Enhance recurring logic with:

- auto-creation of due entries
- reminders before due date
- missed payment detection
- subscription tracking

### 8. Advanced Analytics

Add:

- month-over-month comparison
- year-over-year trends
- category heatmaps
- spending forecasts
- burn rate calculation
- savings rate
- cash flow analysis

### 9. File and Receipt Support

You can extend entries with:

- receipt uploads
- invoice attachments
- bill PDFs
- document storage

Storage options:

- Firebase Storage
- Supabase Storage
- AWS S3
- Cloudinary

### 10. PWA and Mobile Experience

Make it feel like a real product:

- Progressive Web App support
- offline mode
- home screen install
- app-like navigation
- mobile-first gesture improvements

## Real-World Production Roadmap

If the goal is to make ExpenseTrail “live-world ready,” this is the most practical order:

### Phase 1: Production Foundation

- move auth to Firebase/Supabase/Auth0
- move data to cloud database
- hash passwords properly
- add validation and error handling
- improve import/export reliability

### Phase 2: Financial Product Features

- auto-post recurring items
- category analytics
- notifications
- better reports
- attachments and receipts

### Phase 3: AI and Intelligent Finance

- AI categorization
- AI monthly summaries
- AI savings recommendations
- AI chat-based finance assistant
- OCR-based bill scanning

### Phase 4: Real Integrations

- bank transaction sync
- payment/expense webhooks
- email summary automation
- mobile push notifications

## Suggested AI/API Integration Stack

If you want the best practical stack for this specific project:

### Recommended Modern Stack

- Frontend: current HTML/CSS/JavaScript or migrate to React/Next.js
- Auth: Supabase Auth or Firebase Auth
- Database: Supabase Postgres or Firestore
- Charts: Chart.js or Recharts
- AI: OpenAI API
- OCR: Google Vision API or Tesseract
- Storage: Supabase Storage or Firebase Storage
- Notifications: OneSignal / Firebase Cloud Messaging
- Hosting: Vercel / Netlify / Firebase Hosting

## Resume-Friendly Summary

ExpenseTrail is a responsive personal finance management web application that supports authentication, onboarding, income/expense tracking, category budgets, recurring transaction management, filtering, and financial analytics through a modern dashboard UI built with HTML, CSS, JavaScript, and Chart.js.

## Author / Notes

This project currently represents a strong frontend-first finance dashboard with room to evolve into a production-grade SaaS or fintech-style application through backend, AI, and finance API integrations.

