import { test, expect } from "@playwright/test";

test.describe("Contact page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("contact page loads with correct heading", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/create|special/i);
  });

  test("all required form fields are present", async ({ page }) => {
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/phone/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/interested in/i)).toBeVisible();
  });

  test("form shows validation errors when submitted empty", async ({ page }) => {
    await page.getByRole("button", { name: /send inquiry/i }).click();
    await expect(page.getByText(/name is required/i)).toBeVisible();
  });

  test("form submit button has touch-friendly size", async ({ page }) => {
    const btn = page.getByRole("button", { name: /send inquiry/i });
    const box = await btn.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  });

  test("all required fields accept input", async ({ page }) => {
    await page.getByLabel(/name/i).fill("Test User");
    await page.getByLabel(/phone/i).fill("+1 868 555 0000");
    await page.getByLabel(/email/i).fill("test@example.com");
    await page.getByLabel(/interested in/i).selectOption({ index: 1 });
    /* No errors should show yet */
    await expect(page.getByText(/name is required/i)).not.toBeVisible();
  });

  test("WhatsApp direct link is present on contact page", async ({ page }) => {
    const wa = page.getByRole("link", { name: /whatsapp/i }).first();
    await expect(wa).toBeVisible();
    await expect(wa).toHaveAttribute("href", /wa\.me/);
  });
});
