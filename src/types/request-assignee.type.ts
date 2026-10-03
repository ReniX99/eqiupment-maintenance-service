export type TAddRequestAssignee = {
  requestId: string;
  technicianId: string;
  role: "lead" | "member";
  hours: number;
};
