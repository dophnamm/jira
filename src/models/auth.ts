import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Minimum 8 characters"),
});

export type TSignInForm = z.infer<typeof SignInSchema>;

export const SignUpSchema = SignInSchema.extend({
  name: z.string().min(1, "Invalid name"),
});

export type TSignUpForm = z.infer<typeof SignUpSchema>;
