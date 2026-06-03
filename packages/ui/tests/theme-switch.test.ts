import { render, fireEvent } from "@testing-library/vue";
import { nextTick } from "vue";
import { beforeEach, describe, expect, it } from "vitest";

import ThemeSwitch from "../src/molecules/theme-switch.vue";

describe("ThemeSwitch", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("Keeps light mode as default", async () => {
    const { getByRole } = render(ThemeSwitch);
    await nextTick();

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
    expect(getByRole("button", { name: "Switch to dark mode" })).toBeTruthy();
  });

  it("Hydrates theme mode from localStorage", async () => {
    localStorage.setItem("theme", "dark");

    const { getByRole } = render(ThemeSwitch);
    await nextTick();

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(getByRole("button", { name: "Switch to light mode" })).toBeTruthy();
  });

  it("Toggles between dark and light modes", async () => {
    const { getByRole } = render(ThemeSwitch);
    await nextTick();

    await fireEvent.click(getByRole("button", { name: "Switch to dark mode" }));

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");

    await fireEvent.click(getByRole("button", { name: "Switch to light mode" }));

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
