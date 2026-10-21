# DevPocket ⚡️
### Every developer tool. One pocket.

> **Small tools. Big productivity.**  
> Format, encode, compare, generate, and debug in seconds. A collection of fast, free developer utilities designed to keep your workflow moving.

---

## 🚀 Overview

**DevPocket** is a premium, privacy-first developer toolkit web application engineered with modern frontend architecture, neon animated accents, dark dot-grid texture, pure white light mode, and a custom arrow pointer. 

Unlike traditional ad-heavy converter websites that upload your data to remote servers, DevPocket processes **100% of core tool operations locally inside your browser**.

---

## ✨ Core Developer Utilities

DevPocket features 8 fully functional, client-side developer utilities:

1. **JSON Formatter & Validator (`/tools/json-formatter`)**
   - Pretty-print with 2-space, 4-space, or tab indentation.
   - Minification & whitespace removal.
   - Deep syntax error diagnostics with line and column coordinates.
   - Recursive alphabetical key sorting (non-destructive).
   - Real-time statistics: total keys, byte size, character count, and max object depth.
   - One-click `.json` export and copy.

2. **Base64 Encoder & Decoder (`/tools/base64`)**
   - True UTF-8 Unicode encoding (supports emojis, accented characters, and international scripts).
   - Clean Base64 format validation with padding (`=`) verification.
   - Instant mode swap and file export (`.b64` / `.txt`).
   - Byte expansion ratio calculations.

3. **URL Encoder & Decoder (`/tools/url-encoder`)**
   - Dual-mode encoding: Component-level (`encodeURIComponent`) vs Full URL (`encodeURI`).
   - Decodes percent-encoded strings with malformed sequence alerts.
   - Automatic query parameter inspector table with one-click key/value extraction.
   - Safe string evaluation (never navigates to user URLs).

4. **Regular Expression Tester (`/tools/regex-tester`)**
   - Real-time RegExp evaluation with flags toggle (`g`, `i`, `m`, `s`, `u`).
   - Live match highlighting, character index offsets, and captured groups breakdown.
   - Preset pattern library (Email, URLs, IPv4, UUID v4, Hex Color, ISO Date).
   - Built-in ReDoS safeguards (bounded execution loop and max match limits).

5. **UUID / GUID Generator (`/tools/uuid-generator`)**
   - Cryptographically secure RFC 4122 v4 generation using `crypto.randomUUID()` and Web Cryptography.
   - Never uses pseudo-random `Math.random()`.
   - Batch generation (1 to 100+ identifiers).
   - Uppercase / lowercase and hyphen toggle options.
   - Export to `.txt` or `.json`.

6. **Timestamp Converter (`/tools/timestamp`)**
   - Live Unix epoch clock ticker (seconds and milliseconds).
   - Dual-direction conversion: Epoch &rarr; Human Date and Date &rarr; Epoch.
   - Explicit seconds vs milliseconds selector with heuristic unit suggestions.
   - ISO 8601, UTC, Local time, and relative time calculation ("in 2 hours", "3 days ago").

7. **Text & Code Diff Checker (`/tools/diff-checker`)**
   - Myers diff algorithm computing line-by-line additions, deletions, and unchanged blocks.
   - Side-by-side view on desktop and unified view on mobile.
   - Ignore whitespace and ignore case toggle options.
   - Additions/deletions statistics and unified patch generation.

8. **Color Converter & Contrast Checker (`/tools/color-tools`)**
   - Bidirectional HEX &harr; RGB &harr; HSL &harr; HSV conversion.
   - WCAG 2.2 Relative Luminance and contrast ratio calculator.
   - AA and AAA pass/fail badges for normal text (&ge; 4.5:1, &ge; 7:1) and large text (&ge; 3:1, &ge; 4.5:1).
   - Harmonic palette generator (Complementary, Analogous, Triadic, Monochromatic Shades).
   - Interactive color picker and palette JSON export.

---

## 🎨 Visual Design System

- **Controlled Neon Palette**: Electric Cyan (`#00F0FF`), Neon Violet (`#8B5CF6`), Bright Blue (`#3B82F6`), and Acid Lime (`#84CC16`).
- **Dark Mode**: Near-black (`#070709`) surface with a subtle 24px dot-grid texture and fine borders.
- **Light Mode**: Strict `#FFFFFF` pure white background with clean gray borders and minimal shadows.
- **Animated Neon Borders**: CSS conic-gradient rotating borders (`NeonContainer`) with reduced-motion fallback.
- **Custom Arrow Cursor**: Refined arrow silhouette with neon outline/glow accent that follows desktop mouse movement, scales on interactive targets, and gracefully disables on touch devices.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 App Router |
| Language | TypeScript (strict type checking) |
| Styling | Tailwind CSS & custom design tokens |
| Icons | Lucide React |
| Animations | CSS Keyframes & Framer Motion |
| Diff Engine | Myers Diff (`diff`) |
| Testing | Vitest & Playwright |
| Deployment | Vercel compatible |

---

## 📦 Getting Started

### 1. Prerequisites
- Node.js 18+ (tested on Node v24)
- npm 9+

### 2. Clone and Install
```bash
git clone https://github.com/example/devpocket.git
cd devpocket
npm install
```

### 3. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env.local
```

Configure your `.env.local` if using optional custom providers:
```ini
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GITHUB_REPO_URL=https://github.com/example/devpocket

# Optional Contact Form Provider (defaults to honest local logging mode)
CONTACT_EMAIL_PROVIDER=mock
CONTACT_EMAIL_TO=ranit.das.1321@gmail.com
RESEND_API_KEY=

# Optional Privacy-Safe Analytics (disabled by default until user cookie consent)
NEXT_PUBLIC_ANALYTICS_PROVIDER=none
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing and Verification

Run the comprehensive test suites:

```bash
# Run unit tests with Vitest (21 tests covering all tools)
npm run test

# Run TypeScript type check
npm run typecheck

# Run Next.js and ESLint code linting
npm run lint

# Run full production build
npm run build

# Run Playwright end-to-end tests
npm run test:e2e
```

---

## 🚢 Deployment (Vercel)

DevPocket is natively designed for zero-config Vercel deployment:

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Import the project in your [Vercel Dashboard](https://vercel.com).
3. Set the `NEXT_PUBLIC_SITE_URL` environment variable to your production domain (e.g. `https://devpocket.dev`).
4. Click **Deploy**.

---

## 🔒 Privacy & Security Highlights

- **Zero-Payload Storage**: No code snippets, JSON files, regex patterns, or user secrets are ever sent to a remote database.
- **Client-Side Cryptography**: UUIDs generated exclusively using the Web Cryptography API (`crypto.randomUUID()`).
- **No Unsafe Eval**: JSON and user inputs are strictly parsed using standard `JSON.parse` and regex tokenizers; never evaluated as arbitrary JavaScript.
- **Honeypot & Rate Limiting**: The contact API handler includes rate-limiting sliding windows and honeypot bot trap fields.
- **Granular Cookie Preferences**: Strictly Necessary, Functional Preferences, and Privacy-Safe Analytics categories with full user control.

---

## 📄 License

MIT License © 2026 DevPocket Lab. Free for personal and commercial development workflows.
