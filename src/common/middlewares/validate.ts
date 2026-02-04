import { z, ZodError, ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

type RequestSchemaShape = {
  body?: unknown;
  params?: unknown;
  query?: unknown;
};

export const validate =
  (schema: ZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      }) as RequestSchemaShape;

      if (parsed.body !== undefined) {
        req.body = parsed.body;
      }

      if (parsed.params !== undefined) {
        req.params = parsed.params as any;
      }

      if (parsed.query !== undefined) {
        req.query = parsed.query as any;
      }

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          statusCode: 400,
          message: "Validation failed",
          errors: err.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      next(err);
    }
  };
