import type { LazyExoticComponent, ComponentType } from "react";

export type TypeRouteParams = Record<string, string>;

export interface TypeRoute {
  name: string;
  component: LazyExoticComponent<ComponentType<any>>;
  paths: Partial<Record<string, string>>;
  labels?: Partial<Record<string, string>>;
  params?: TypeRouteParams;
  children?: TypeRoute[];
}

export interface TypeRouteResult {
  route: TypeRoute;
  params: TypeRouteParams;
}

export interface TypeBreadcrumb {
  name: string;
  path: string;
  label: string;
}

export interface TypeRouterContextValue {
  route: TypeRoute | null;
  params: TypeRouteParams;
  lang: string;
  history: string[];
  breads: (name: string, language?: string) => TypeBreadcrumb[];
  n: (name: string, params?: TypeRouteParams, language?: string) => void;
  routeTitle: (title?: string) => string;
  refresh: () => void;
}

export interface TypeRouterProviderProps {
  children: ReactNode;
}
