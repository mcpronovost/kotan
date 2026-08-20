import type { TypeRoute } from "../types";
import React from "react";

export const ROUTES: TypeRoute[] = [
  {
    name: "home",
    component: React.lazy(() => import("../../../pages/Home")),
    paths: {
      fr: "",
      en: "",
    },
  },
  {
    name: "register",
    component: React.lazy(() => import("../../../pages/Auth/Register")),
    paths: {
      fr: "inscription",
      en: "register",
    },
  },
  {
    name: "settlement",
    component: React.lazy(() => import("../../../pages/Settlement/index")),
    paths: {
      fr: "colonie",
      en: "settlement",
    },
  },
  {
    name: "leaderboard",
    component: React.lazy(() => import("../../../pages/Leaderboard/index")),
    paths: {
      fr: "classement",
      en: "leaderboard",
    },
  },
  {
    name: "404",
    component: React.lazy(() => import("../../../pages/Error404")),
    paths: {
      fr: "404",
      en: "404",
    },
  },
];