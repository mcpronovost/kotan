import type {
  TypeLang,
  TypeTranslationDict,
  TypeTranslationVars,
  TypeTranslateFn,
  TypeTranslationContextValue,
  TypeTranslationProviderProps,
} from "./types";
import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { DEFAULT_LANG, loadTranslations } from "./utils";

const TranslationContext = createContext<TypeTranslationContextValue | undefined>(undefined);

const interpolate = (template: string, count: number | undefined, vars: TypeTranslationVars): string =>
  template.replace(/\{(\w+)\}/g, (_, varName: string) =>
    varName === "count" ? String(count) : String(vars[varName] ?? `{${varName}}`),
  );

export function TranslationProvider({ children, lang = DEFAULT_LANG }: TypeTranslationProviderProps) {
  const translationRef = useRef<TypeTranslationDict | null>(null);

  useEffect(() => {
    const translation = loadTranslations(lang);
    translationRef.current = translation;
  }, [lang]);

  const handleTranslate: TypeTranslateFn = (key, count, vars = {}) => {
    if (!translationRef.current) {
      const translation = loadTranslations(lang);
      translationRef.current = translation;
    }

    const translation = translationRef.current[key];

    if (typeof translation === "object" && count !== undefined) {
      const rules = new Intl.PluralRules(lang);
      const pluralForm = rules.select(count);
      const result = translation[pluralForm] || translation["other"];
      return interpolate(result as string, count, vars);
    }

    if (typeof translation === "object") {
      const result = translation["zero"];
      return interpolate(result as string, count, vars);
    }

    if (typeof translation === "string") {
      return interpolate(translation, count, vars);
    }

    // eslint-disable-next-line no-console
    // console.warn(`Translation not found for key: "${key}".`);
    return key;
  };

  const value = useMemo<TypeTranslationContextValue>(
    () => ({
      lang,
      t: handleTranslate,
    }),
    [lang],
  );

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
}

export function useTranslation(): TypeTranslationContextValue {
  const context = useContext(TranslationContext);
  if (!context) {
    window.location.reload();
    return { lang: "fr", t: () => "" };
  }
  return context;
}
