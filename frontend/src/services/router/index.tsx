import type {
  TypeRoute,
  TypeRouteParams,
  TypeRouteResult,
  TypeBreadcrumb,
  TypeRouterContextValue,
  TypeRouterProviderProps,
} from "./types";
import { createContext, useCallback, useContext, useMemo, useState, useEffect, type ReactNode } from "react";
import { DEFAULT_LANG, SUPPORTED_LANGS } from "@/services/translation/utils";
import { ROUTES } from "./routes";
import { getLangFromPath, findRoute, buildRoutePath, getBreadcrumbs } from "./utils";

const RouterContext = createContext<TypeRouterContextValue | undefined>(undefined);

const initialRouteResult: TypeRouteResult | null = findRoute(
  window.location.pathname,
  getLangFromPath(window.location.pathname),
);

const INITIAL_STATE: TypeRouterContextValue = {
  history: [window.location.pathname],
  lang: getLangFromPath(window.location.pathname),
  route: initialRouteResult?.route || null,
  params: initialRouteResult?.params || {},
  n: () => {},
  breads: () => [],
  routeTitle: () => "",
  refresh: () => {
    window.location.reload();
  },
};

export function RouterProvider({ children }: TypeRouterProviderProps) {
  const [history, setHistory] = useState<string[]>(INITIAL_STATE.history);
  const [lang, setLang] = useState<string>(INITIAL_STATE.lang);
  const [route, setRoute] = useState<TypeRoute | null>(INITIAL_STATE.route);
  const [params, setParams] = useState<TypeRouteParams>(INITIAL_STATE.params);

  /* if (route === null && !SUPPORTED_LANGS.some((l) => window.location.pathname.startsWith(`/${l}`))) {
      window.location.pathname = `/${DEFAULT_LANG}${window.location.pathname}`;
      return null;
    } */

  const navigate = useCallback(
    (name: string, params: TypeRouteParams = {}, language: string = lang) => {
      // Build the full path for the route
      const routePath = buildRoutePath(name, params, language);
      if (routePath === null || routePath === undefined) {
        // Fallback to 404 if route not found
        const fallbackRoute = ROUTES.find((r: TypeRoute) => r.name === "404");
        if (fallbackRoute) {
          // const newPath = `/${language}/${fallbackRoute.paths[language]}`;
          const newPath = `/${fallbackRoute.paths[language]}`;
          window.history.pushState({}, "", newPath);
          setHistory((h) => [...h, newPath]);
          setLang(language);
          setRoute(fallbackRoute);
        }
        return;
      }
      // const newPath = `/${language}/${routePath}`;
      const newPath = `/${routePath}`;
      window.history.pushState({}, "", newPath);
      setHistory((h) => [...h, newPath]);
      setLang(language);
      // Find and set the actual route
      const routeResult: TypeRouteResult | null = findRoute(newPath, language);
      setRoute(routeResult?.route || null);
      setParams(routeResult?.params || {});
    },
    [lang],
  );

  const refresh = useCallback(() => {
    window.location.reload();
  }, [lang, route]);

  const changePageTitle = useCallback((title?: string) => {
    const appName = "Kotan";
    if (title) return (window.document.title = `${title} | ${appName}`);
    return (window.document.title = appName);
  }, []);

  useEffect(() => {
    if (window.document.documentElement.lang !== lang) {
      window.document.documentElement.lang = lang;
    }
  }, [lang]);

  useEffect(() => {
    const onPopState = () => {
      const newLang = getLangFromPath(window.location.pathname);
      const routeResult: TypeRouteResult | null = findRoute(window.location.pathname, newLang);
      setLang(newLang);
      setRoute(routeResult?.route || null);
      setParams(routeResult?.params || {});
      setHistory((h) => [...h, window.location.pathname]);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const value = useMemo<TypeRouterContextValue>(
    () => ({
      route,
      params,
      lang,
      history,
      breads: (name: string, language: string = lang) => getBreadcrumbs(name, language),
      n: (name: string, params: TypeRouteParams = {}, language: string = lang) => navigate(name, params, language),
      routeTitle: (title?: string) => changePageTitle(title),
      refresh,
    }),
    [route, params, lang, history],
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter(): TypeRouterContextValue {
  const context = useContext(RouterContext);
  if (!context) {
    window.location.reload();
    return INITIAL_STATE;
  }
  return context;
}
