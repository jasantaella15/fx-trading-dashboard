import { render, fireEvent, waitFor, within } from "@testing-library/vue";
import { nextTick, ref } from "vue";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import LanguageSwitch from "../src/molecules/language-switch.vue";

const locale = ref("en");

vi.mock("vue-i18n", () => ({
  useI18n: () => ({
    locale,
  }),
}));

describe("LanguageSwitch", () => {
  beforeAll(() => {
    HTMLElement.prototype.hasPointerCapture ??= () => false;
    HTMLElement.prototype.setPointerCapture ??= () => undefined;
    HTMLElement.prototype.releasePointerCapture ??= () => undefined;
  });

  beforeEach(() => {
    locale.value = "en";
    localStorage.clear();
  });

  it("Renders current locale", () => {
    const { getByRole } = render(LanguageSwitch);
    const trigger = within(getByRole("combobox"));

    expect(trigger.getByText("EN")).toBeTruthy();
    expect(trigger.getByAltText("English")).toBeTruthy();
  });

  it("Hydrates locale from localStorage", async () => {
    localStorage.setItem("locale", "mt");

    const { getByRole } = render(LanguageSwitch);
    await nextTick();
    const trigger = within(getByRole("combobox"));

    expect(locale.value).toBe("mt");
    expect(trigger.getByText("MT")).toBeTruthy();
    expect(trigger.getByAltText("Malti")).toBeTruthy();
  });

  it("Updates language in vue-i18n and localStorage", async () => {
    const { getByRole } = render(LanguageSwitch);
    const combobox = getByRole("combobox");

    await fireEvent.keyDown(combobox, { key: "ArrowDown" });
    await fireEvent.keyDown(getByRole("option", { name: /FR/ }), { key: "Enter" });
    const trigger = within(combobox);

    await waitFor(() => expect(locale.value).toBe("fr"));
    expect(localStorage.getItem("locale")).toBe("fr");
    expect(trigger.getByText("FR")).toBeTruthy();
    expect(trigger.getByAltText("Français")).toBeTruthy();
  });

  it("falls back to English for unsupported locales", async () => {
    localStorage.setItem("locale", "zz");

    const { getByRole } = render(LanguageSwitch);
    await nextTick();
    const trigger = within(getByRole("combobox"));

    expect(locale.value).toBe("en");
    expect(localStorage.getItem("locale")).toBe("en");
    expect(trigger.getByText("EN")).toBeTruthy();
    expect(trigger.getByAltText("English")).toBeTruthy();
  });
});
