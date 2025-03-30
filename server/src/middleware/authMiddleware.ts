import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/config";
import { JWT_SECRET_KEY } from "../config/env";
import { AuthenticatedRequest } from "../utils/types";

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token is missing or invalid" }) as any;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as { userId: number };

    const user = await prisma.admin.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" }) as any;
    }

    req.user = user; // Tambahkan properti `user` ke req
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" }) as any;
  }
};
