import type { ReactNode } from "react";

export type TypeLang = "fr" | "en";

export interface TypeTranslationDict {
  [key: string]: string | TypeTranslationDict;
}

export interface TypeTranslationFile {
  path: string;
  translations: TypeTranslationDict;
}

export type TypeTranslationVars = Record<string, string | number>;

export type TypeTranslateFn = (key: string, count?: number, vars?: TypeTranslationVars) => string;

export interface TypeTranslationContextValue {
  lang: TypeLang;
  t: TypeTranslateFn;
}

export interface TypeTranslationProviderProps {
  children: ReactNode;
  lang?: TypeLang;
}
