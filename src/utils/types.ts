import { Request } from "express";
import { Admin } from "@prisma/client";

/**
 * Enter your types here
 */
interface AuthenticatedRequest extends Request {
  user?: Admin | null;
}

export type { AuthenticatedRequest };
