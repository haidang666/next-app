"use client";

import { IntlProvider } from "next-intl";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  defaultLocale,
  LOCALE_STORAGE_KEY,
  type Locale,
  locales,
} from "./config";

type Messages = Record<string, Record<string, string>>;

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocaleContext must be used within I18nProvider");
  }
  return context;
}

async function loadMessages(locale: Locale): Promise<Messages> {
  return (await import(`../../messages/${locale}.json`)).default;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [messages, setMessages] = useState<Messages | null>(null);

  useEffect(() => {
    const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale;
    if (storedLocale && locales.includes(storedLocale)) {
      setLocaleState(storedLocale);
    } else {
      localStorage.setItem(LOCALE_STORAGE_KEY, defaultLocale);
    }
  }, []);

  useEffect(() => {
    loadMessages(locale).then(setMessages);
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    setLocaleState(newLocale);
  }, []);

  if (!messages) {
    return null;
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
}
