export type TJwtPayload = {
  userId: string;
  role: "viewer" | "technician" | "admin";
};
