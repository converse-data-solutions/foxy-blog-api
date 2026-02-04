import { Request, Response } from "express";
import { TagService } from "./tag.service";

export const TagController = {
  async create(req: Request, res: Response) {
    const tag = await TagService.create(req.body);
    res.status(201).json(tag);
  },

  async getAll(req: Request, res: Response) {
    const tags = await TagService.findAll();
    res.json(tags);
  },

  async update(req: Request, res: Response) {
    const updated = await TagService.update(req.params.id as string, req.body);
    res.json(updated);
  },

  async delete(req: Request, res: Response) {
    await TagService.delete(req.params.id as string);
    res.json({ message: "Tag deleted successfully" });
  }
};
