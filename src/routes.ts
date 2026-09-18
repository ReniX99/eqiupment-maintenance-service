import { Router } from "express";
import HealthRouter from "./routes/health.router";
import EquipmentsRouter from "./routes/equipments.route";

const router = Router();

router.use("/health", HealthRouter);
router.use("/equipment", EquipmentsRouter);

export default router;
