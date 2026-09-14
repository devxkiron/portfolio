# DEVXKIRON Portfolio

Modern, high-performance developer portfolio built with **Next.js 16 (Turbopack)**, **React 19**, **Tailwind CSS v4**, and **GSAP**.

---

## 🚀 Today's Implementations & Updates

### 1. 📅 Booking & Strategy Call Section (`src/app/_components/booking`)
- **Custom Dark-Themed Scheduler**:
  - Developed a minimalist, high-contrast calendar UI matching the portfolio's neon green (`#aeff00`) and deep dark (`#0a0a0a`) theme.
  - Restricted date selection to an active **7-day window** (past dates disabled).
  - Implemented sleek **skeleton loaders** during availability fetch.
  - Added a custom dark slim scrollbar (`.custom-dark-scrollbar`).
- **Live Calendly API v2 Availability Integration**:
  - Created `/api/calendly/availability` to query Calendly API v2 in real time.
  - Filters out busy and conflicting slots based on live Google Calendar schedule.
- **Direct In-Page Google Calendar & Meet Sync**:
  - Built `CalendlyModal` with custom glassmorphic styling, top bar details, and iframe loader.
  - Automatically pre-fills client's Name and Work Email.
  - Directly creates the event in **Google Calendar** and sends automated **Google Meet** links to both host and invitee.
  - Automatically captures `calendly.event_scheduled` events cross-browser.
- **Animated Thank You Modal (`ThankYouModal`)**:
  - Smooth GSAP pop entrance with spring checkmark animation.
  - Displays meeting summary (Date, Time, Email, Google Meet confirmation).
  - Eliminated manual "Add to Calendar" friction—confirmations are completely automatic.

---

### 2. ❓ Frequently Asked Questions (FAQ) Section (`src/app/_components/faq`)
- **Interactive Accordion**:
  - Built `FaqSection` and `FaqAccordionItem` featuring GSAP ScrollTrigger animations.
  - Smooth height expansion and opacity transitions.
  - Minimalist `+` / `−` indicators with neon green highlight.
- **Config-Driven Architecture**:
  - Centralized all 5 Q&A items in `faq.config.ts` for simple content updates without code refactoring.

---

### 3. 🦶 Footer Section (`src/app/_components/footer`)
- **5-Column Navigation Grid**:
  - Organized columns: `SERVICES`, `CASE STUDIES`, `COMPANY`, `RESOURCES`, `CONTACT`.
  - Configurable links and metadata via `footer.config.ts`.
- **Live Availability Indicator**:
  - Added a pulsing neon status badge: `• Available for Q3 Projects`.
- **Responsive Layout**:
  - Full mobile-to-desktop grid with clean copyright and policy notices.

---

### 4. 🎨 Styling & Theme System (`src/app/globals.css`)
- **Tailwind CSS v4 Token Preservation**:
  - Fixed theme overrides by preserving `@theme inline` custom brand color definitions:
    - `--brand-neon`: `#aeff00`
    - `--brand-dark`: `#101612`
    - `--brand-muted`: `#f0f0ea`
- **Custom Dark Scrollbar**:
  - Added `.custom-dark-scrollbar` utility with custom thumb colors and hover effects for slot pickers.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 16.3.4 (App Router, Turbopack)
- **UI Library**: React 19.2.8
- **Styling**: Tailwind CSS v4 (PostCSS)
- **Animations**: GSAP 3.15 (ScrollTrigger)
- **Icons**: Lucide React
- **Integrations**: Calendly API v2 & Google Calendar

---

## ⚙️ Environment Configuration

Add the following environment variables to `.env.local`:

```env
# Calendly Configuration
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/devxkiron/30min
CALENDLY_API_TOKEN=your_calendly_personal_access_token
CALENDLY_EVENT_TYPE_URI=https://api.calendly.com/event_types/your_event_type_uuid
```

---

## 💻 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run local development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```
