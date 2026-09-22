import z from "zod";

export const weatherQuerySchema = z.strictObject({
  date: z.iso.date(),
});
export type WeatherQuery = z.infer<typeof weatherQuerySchema>;
