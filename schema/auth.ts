import { z } from "zod";

export const signInSchema = z.object({
    email: z
        .string()
        .min(1, "Email required")
        .email("Enter a valid email address"),
    password: z
        .string()
        .min(1, "Password required"),
});

export const signUpSchema = z.object({
        email: z
            .string()
            .min(1, "Email required")
            .email("Enter a valid email address"),
        password : z
            .string()
            .min(6, "Password must be at least 6 characters"),
        confirmPassword: z
            .string()
            .min(1, "Please confirm password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

    export type SignInFormData = z.infer<typeof signInSchema>;
    export type SignUpFormData = z.infer<typeof signUpSchema>;