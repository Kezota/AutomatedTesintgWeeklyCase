import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/env";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  console.log("login", req.body);

  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email) === false) {
    return res.status(400).json({ message: "Email is invalid" });
  }
  const checkUser = await prisma.admin.findUnique({
    where: {
      email: email,
    },
  });
  if (checkUser === null) {
    return res.status(404).json({ message: "User not found" }) as any;
  }
  const isPasswordValid = await bcrypt.compare(password, checkUser.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" }) as any;
  }

  const token = jwt.sign({ userId: checkUser.id }, JWT_SECRET_KEY!, {
    expiresIn: "1h",
  });

  return res.status(200).json({ message: "Login successful", token }) as any;
};

export const register = async (req: Request, res: Response) => {
  console.log("register", req.body);

  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" }) as any;
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" }) as any;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email) === false) {
    return res.status(400).json({ message: "Email is invalid" }) as any;
  }
  const checkUser = await prisma.admin.findUnique({
    where: {
      email: email,
    },
  });
  if (checkUser !== null) {
    return res.status(409).json({ message: "Email already exists" }) as any;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await prisma.admin.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });
  return res
    .status(201)
    .json({ message: "User created successfully", data: createdUser }) as any;
};
