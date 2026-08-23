import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import authRoutes from "./routes/auth";
import healthRoutes from "./routes/health";

const HTTP_TIMEOUT_MS = 120000;
const VERSION = process.env.VERSION || "0.1.0";

const app: express.Express = express();

// Security middleware with enhanced configuration
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        fontSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        mediaSrc: ["'self'", "data:", "blob:", "https:"],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    noSniff: true,
    xssFilter: true,
    referrerPolicy: {
      policy: "strict-origin-when-cross-origin",
    },
  }),
);

// CORS middleware
app.use(
  cors({
    origin: [
      "http://localhost",
      "http://localhost:3000",
      "http://localhost:8000",
    ],
    credentials: true,
    exposedHeaders: [
      "X-Mokp-Version",
      "Retry-After",
    ],
    optionsSuccessStatus: 200, // Support legacy browsers
  }),
);

// Limits
app.use(express.json({ limit: 10485760 }));
app.use(
  express.urlencoded({
    extended: true,
    limit: 1048576,
  }),
);

// Default cache policy: prevent browsers from caching authenticated API responses.
// Auth-gated routes must not be served from browser cache after logout or to a
// different user. Specific routes (avatars, manifests, public media) override this
// with their own explicit Cache-Control headers.
app.use(["/api/"], (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("X-Mokp-Version", VERSION);
  if (req.method === "GET" || req.method === "HEAD") {
    res.setHeader("Cache-Control", "no-store");
  }
  next();
});

// Bound inactive connections by default. Routes that intentionally accept
// long uploads or streams can replace this timeout after admission.
app.use((req, res, next) => {
  req.setTimeout(HTTP_TIMEOUT_MS);
  res.setTimeout(HTTP_TIMEOUT_MS);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoutes);

// 404 fallback for unknown routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    ok: false,
    error: "Not Found",
    message: "The requested resource was not found",
    path: req.originalUrl,
  });
});

export default app;
