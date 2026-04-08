import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for Bubbles & Brews Co.
 * Runs against local dev server by default; set BASE_URL env var for staging/prod.
 *
 * Mobile is the PRIMARY target — desktop tests are secondary.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 1,
  reporter: [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    /* ── Mobile (primary) ─────────────────────────────────── */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 14"] },
    },

    /* ── Desktop (secondary) ──────────────────────────────── */
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  /* Start the Next.js dev server automatically before tests */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
