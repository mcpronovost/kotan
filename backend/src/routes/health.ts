import type { Request, Response } from "express";
import express from "express";
import { prisma } from "@/db";

const router = express.Router();

const users = await prisma.user.findMany();

router.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).json({ ok: true, users: users });
  } catch (error) {
    res.status(503).json({
      status: "error",
      timestamp: new Date().toISOString(),
      error: "Health check failed",
      uptime: process.uptime(),
    });
  }
});

export default router;
