"use client";

import { useTranslations } from "next-intl";
import { type Locale, locales, useLocaleContext } from "@/i18n";

const localeNames: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
};

export function LanguageSwitcher() {
  const t = useTranslations("common");
  const { locale, setLocale } = useLocaleContext();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      className="rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
      aria-label={t("selectLanguage")}
    >
      {locales.map((loc) => (
        <option key={loc} value={loc}>
          {localeNames[loc]}
        </option>
      ))}
    </select>
  );
}
