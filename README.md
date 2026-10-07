# Council Tax Discount Eligibility Checker

A GOV.UK-style web application that helps users check if they might be eligible
for a Council Tax discount. Built as a prototype to demonstrate user-centred
design, accessible forms, conditional logic and testing.

## Live demo

https://github.com/jordanjjy9819-debug/council-tax-checker/tree/main/src

## User need

Many people are unaware they might qualify for a Council Tax discount. This
tool guides users through a short questionnaire and provides an indicative
result, signposting them to their local council to apply.

## Tech stack

- **React** (via Vite) — UI framework
- **JavaScript** — programming language
- **CSS** — GOV.UK Design System patterns and styling
- **Vitest** — unit testing

## Features

- Multi-step form with one question per page (GOV.UK pattern)
- Conditional logic — questions adapt based on previous answers
- Input validation with accessible error messages
- Results page with clear discount information and disclaimers
- Responsive design for mobile and desktop
- GOV.UK Design System styling and patterns
- Unit tests for eligibility logic

## How to run locally

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
git clone https://github.com/YOUR-USERNAME/council-tax-checker.git
cd council-tax-checker
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

### Run tests

```bash
npm test
```

## Project structure
