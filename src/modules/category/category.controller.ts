import { Request, Response } from "express";
import { CategoryService } from "./category.service";

export const CategoryController = {
  async create(req: Request, res: Response) {
    const category = await CategoryService.create(req.body);
    res.status(201).json(category);
  },

  async getAll(req: Request, res: Response) {
    const categories = await CategoryService.findAll();
    res.json(categories);
  },

  async update(req: Request, res: Response) {
    const updated = await CategoryService.update(req.params.id as string, req.body);
    res.json(updated);
  },

  async delete(req: Request, res: Response) {
    await CategoryService.delete(req.params.id as string);
    res.json({ message: "Category deleted successfully" });
  }
};
