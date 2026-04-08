import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  /* ── Load & structure ───────────────────────────────────────────── */

  test("page loads with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Bubbles & Brews/i);
  });

  test("hero section is visible and contains headline", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Pour");
  });

  test("hero CTAs are present and have sufficient touch target", async ({ page }) => {
    const bookBtn = page.getByRole("link", { name: /^book bella$/i });
    const exploreBtn = page.getByRole("link", { name: /^explore offerings$/i });
    await expect(bookBtn).toBeVisible();
    await expect(exploreBtn).toBeVisible();
    const box = await bookBtn.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  });

  /* ── Navigation ─────────────────────────────────────────────────── */

  test("navbar wordmark is visible on load", async ({ page }) => {
    // Scoped to the <header> banner to avoid matching other brand-name links
    await expect(
      page.getByRole("banner").getByRole("link", { name: "Bubbles & Brews Co. — Home" })
    ).toBeVisible();
  });

  test("mobile hamburger menu opens and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile only");
    const menuBtn = page.getByRole("button", { name: /open menu/i });
    await menuBtn.click();
    // Scoped to the overlay by data-testid
    const overlay = page.locator('[data-testid="mobile-menu"]');
    await expect(overlay).toBeVisible();
    const menuLink = overlay.getByRole("link", { name: /^offerings$/i });
    await expect(menuLink).toBeVisible();
    await page.getByRole("button", { name: /close menu/i }).click();
    // AnimatePresence unmounts after exit animation (~500ms)
    await expect(overlay).not.toBeVisible({ timeout: 2000 });
  });

  /* ── Scroll & sections ──────────────────────────────────────────── */

  test("all homepage sections exist in DOM", async ({ page }) => {
    for (const id of ["tagline", "offerings", "bella", "events"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test("sticky contact bar appears after scrolling on mobile", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile only");
    const bar = page.getByRole("complementary", { name: /quick contact/i });
    await expect(bar).not.toBeVisible();
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.3));
    await expect(bar).toBeVisible({ timeout: 2000 });
  });

  test("offerings section has 4 offering cards", async ({ page }) => {
    await page.locator("#offerings").scrollIntoViewIfNeeded();
    const cards = page.locator("#offerings article");
    await expect(cards).toHaveCount(4);
  });

  /* ── Contact ────────────────────────────────────────────────────── */

  test("WhatsApp link has correct href", async ({ page }) => {
    const whatsappLink = page.getByRole("link", { name: /chat on whatsapp/i }).first();
    await expect(whatsappLink).toHaveAttribute("href", /wa\.me\/18686809826/);
  });

  test("phone link is callable", async ({ page }) => {
    const phoneLink = page.getByRole("link", { name: /\+1.*868.*680/i }).first();
    await expect(phoneLink).toHaveAttribute("href", /tel:/);
  });

  /* ── Metrics counter ────────────────────────────────────────────── */

  test("metrics section is present", async ({ page }) => {
    const section = page.locator('[aria-labelledby="metrics-heading"]');
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible({ timeout: 3000 });
  });
});
