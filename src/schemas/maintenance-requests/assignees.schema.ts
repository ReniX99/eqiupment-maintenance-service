import z from "zod";

export const addRequestAssigneeSchema = z.strictObject({
  technicianId: z.uuid(),
  role: z.enum(["lead", "member"]),
  hours: z.int().min(0),
});

export const addRequestAssigneesSchema = z.array(addRequestAssigneeSchema);

export type AddRequestAssignDto = z.infer<typeof addRequestAssigneeSchema>;
