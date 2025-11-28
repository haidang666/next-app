"use client";

import { useCallback, useEffect, useState } from "react";
import {
  defaultLocale,
  LOCALE_STORAGE_KEY,
  type Locale,
  locales,
} from "./config";

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale;
    if (storedLocale && locales.includes(storedLocale)) {
      setLocaleState(storedLocale);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    setLocaleState(newLocale);
    window.location.reload();
  }, []);

  return { locale, setLocale };
}
