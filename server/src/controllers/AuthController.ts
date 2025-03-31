import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/env";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await prisma.admin.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Sign JWT token
    const expiresInSeconds = 3600; // 1 hour
    const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY!, {
      expiresIn: expiresInSeconds,
    });

    // Omit password from returned user
    const { password: _, ...safeUser } = user;

    // Return structured response
    return res.status(200).json({
      token,
      expiresIn: expiresInSeconds,
      user: safeUser,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await prisma.admin.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const expiresInSeconds = 3600;
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET_KEY!, {
      expiresIn: expiresInSeconds,
    });

    const { password: _, ...safeUser } = newUser;

    return res.status(201).json({
      token,
      expiresIn: expiresInSeconds,
      user: safeUser,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (_: Request, res: Response) => {
  try {
    // For now, just send a success response
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
