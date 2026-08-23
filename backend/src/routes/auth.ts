import type { Request, Response } from "express";
import { Prisma } from "../../prisma/db/client";
import express from "express";
import argon2 from "argon2";

import { prisma } from "@/db";

const router = express.Router();

router.post("/register/", async (req: Request, res: Response) => {
  try {
    const {
      username,
      password,
      password_confirm,
      email,
      playername,
      terms_accepted,
    } = req.body;

    const fields: Record<string, string> = {};

    // ---------------------------------------------------------
    // Validation
    // ---------------------------------------------------------

    if (
      typeof username !== "string" ||
      !/^[A-Za-z0-9_]{1,16}$/.test(username)
    ) {
      fields.username =
        "Username must contain 3 to 16 letters, numbers or underscores.";
    }

    if (typeof password !== "string" || password.length < 8) {
      fields.password = "Password must contain at least 8 characters.";
    }

    if (password !== password_confirm) {
      fields.password_confirm = "Passwords do not match.";
    }

    if (
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      fields.email = "Please enter a valid email address.";
    }

    if (typeof playername !== "string" || playername.trim().length < 2) {
      fields.playername = "Player name must contain at least 2 characters.";
    }

    if (terms_accepted !== true) {
      fields.terms_accepted =
        "You must accept the terms of use and privacy policy.";
    }

    if (Object.keys(fields).length > 0) {
      return res.status(400).json({
        ok: false,
        error: "Validation Error",
        fields,
      });
    }

    // ---------------------------------------------------------
    // Normalize
    // ---------------------------------------------------------

    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPlayername = playername.trim();

    // ---------------------------------------------------------
    // Hash password
    // ---------------------------------------------------------

    const hashedPassword = await argon2.hash(password);

    // ---------------------------------------------------------
    // Create user
    // ---------------------------------------------------------

    const user = await prisma.user.create({
      data: {
        username: normalizedUsername,
        email: normalizedEmail,
        name: normalizedPlayername,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        // is_dev: true,
      },
    });

    return res.status(201).json({
      ok: true,
      user,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const adapterMeta = error.meta;
      const target =
        adapterMeta?.driverAdapterError?.cause?.constraint?.fields ||
        adapterMeta?.driverAdapterError?.cause?.constraint?.index || [];

      const fields: Record<string, string> = {};

      if (target.includes("username")) {
        fields.username = "This username is already taken";
      }

      if (target.includes("email")) {
        fields.email = "This email is already registered";
      }

      return res.status(409).json({
        ok: false,
        error: "Conflict",
        target,
        fields,
      });
    }

    return res.status(500).json({
      ok: false,
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
});

export default router;
