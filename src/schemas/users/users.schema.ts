import z from "zod";

export const registerUserSchema = z.strictObject({
  login: z.string().min(6).max(100),
  password: z.string().min(6).max(100),
  technician: z
    .strictObject({
      fullName: z.string(),
      specialization: z.string().min(3).max(100),
      employeeId: z.string(),
    })
    .optional(),
});

export type RegisterUserDto = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.strictObject({
  login: z.string().min(6).max(100),
  password: z.string().min(6).max(100),
});

export type LoginUserDto = z.infer<typeof loginUserSchema>;
