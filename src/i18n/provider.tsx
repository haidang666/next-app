"use client";

import { IntlProvider } from "next-intl";
import { type ReactNode, useEffect, useState } from "react";
import {
  defaultLocale,
  LOCALE_STORAGE_KEY,
  type Locale,
  locales,
} from "./config";

type Messages = Record<string, Record<string, string>>;

async function loadMessages(locale: Locale): Promise<Messages> {
  return (await import(`../../messages/${locale}.json`)).default;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [messages, setMessages] = useState<Messages | null>(null);

  useEffect(() => {
    const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale;
    if (storedLocale && locales.includes(storedLocale)) {
      setLocale(storedLocale);
    } else {
      localStorage.setItem(LOCALE_STORAGE_KEY, defaultLocale);
    }
  }, []);

  useEffect(() => {
    loadMessages(locale).then(setMessages);
  }, [locale]);

  if (!messages) {
    return null;
  }

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
