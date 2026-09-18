import { Router } from "express";
import HealthRouter from "./routes/health.router";

const router = Router();

router.use("/health", HealthRouter);

export default router;
