import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    return res.status(200).json({
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get products" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, stock } = req.body;

  if (!name || stock == null) {
    return res.status(400).json({ message: "Name and stock are required" });
  }

  try {
    const createdProduct = await prisma.product.create({
      data: { name, stock },
    });

    return res.status(201).json({
      message: "Product created successfully",
      data: createdProduct,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, stock } = req.body;

  if (!name || stock == null) {
    return res.status(400).json({ message: "Name and stock are required" });
  }

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, stock },
    });

    return res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(404).json({ message: "Product not found" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    return res.status(404).json({ message: "Product not found" });
  }
};
