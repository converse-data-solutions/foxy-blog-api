import { z } from "zod";

export const signupSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .nonempty("Name is required"),

    email: z
      .string()
      .email("Invalid email")
      .nonempty("Email is required"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .nonempty("Password is required"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  }),
}); 