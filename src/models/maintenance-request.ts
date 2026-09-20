interface MaintenanceRequest {
  id: string;
  equipmentId: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "new" | "in_progress" | "done" | "rejected";
  plannedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
