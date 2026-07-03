import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import en from './en.json';
import pl from './pl.json';
import sr from './sr.json';

export type LocaleType = 'en' | 'pl' | 'sr';
export type TranslationKeys = keyof typeof en;

interface LanguageContextType {
  locale: LocaleType;
  setLocale: (locale: LocaleType) => void;
  t: (key: TranslationKeys, variables?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<LocaleType, Record<string, string>> = {
  en: en as Record<string, string>,
  pl: pl as Record<string, string>,
  sr: sr as Record<string, string>,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<LocaleType>('en');

  const setLocale = useCallback((newLocale: LocaleType) => {
    setLocaleState(newLocale);
  }, []);

  const t = useCallback((key: TranslationKeys, variables?: Record<string, string>): string => {
    const translationSet = translations[locale] || translations.en;
    let translatedString = translationSet[key] || translations.en[key] || String(key);
    
    if (variables) {
      Object.entries(variables).forEach(([varKey, varValue]) => {
        translatedString = translatedString.replace(`{${varKey}}`, varValue);
      });
    }
    
    return translatedString;
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale,
    t,
  }), [locale, setLocale, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
