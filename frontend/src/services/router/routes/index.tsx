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
    name: "login",
    component: React.lazy(() => import("../../../pages/Auth/Login")),
    paths: {
      fr: "connexion",
      en: "login",
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
    name: "termsofuse",
    component: React.lazy(() => import("../../../pages/Legals/TermsOfUse")),
    paths: {
      fr: "conditions-d-utilisation",
      en: "temrs-of-use",
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