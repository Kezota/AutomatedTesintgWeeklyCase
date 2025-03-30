import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getProduct = async (req: Request, res: Response) => {
  console.log("getProduct", req.body);

  const products = await prisma.product.findMany();
  return res.status(200).json({
    message: "Products retrieved successfully",
    data: products,
  }) as any;
};

export const createProduct = async (req: Request, res: Response) => {
  console.log("createProduct", req.body);

  const { name, stock } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  if (!stock) {
    return res.status(400).json({ message: "Stock is required" });
  }
  const createdProduct = await prisma.product.create({
    data: {
      name: name,
      stock: stock,
    },
  });
  return res.status(200).json({
    message: "Product created successfully",
    data: createdProduct,
  }) as any;
};

export const updateProduct = async (req: Request, res: Response) => {
  console.log("updateProduct", req.body);

  const { name, stock } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  if (!stock) {
    return res.status(400).json({ message: "Stock is required" });
  }
  const updatedProduct = await prisma.product.update({
    where: {
      name: name,
    },
    data: {
      stock: stock,
    },
  });
  return res.status(200).json({
    message: "Product updated successfully",
    data: updatedProduct,
  }) as any;
};

export const deleteProduct = async (req: Request, res: Response) => {
  console.log("deleteProduct", req.body);

  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  const deletedProduct = await prisma.product.delete({
    where: {
      name: name,
    },
  });
  return res.status(200).json({
    message: "Product deleted successfully",
    data: deletedProduct,
  }) as any;
};
