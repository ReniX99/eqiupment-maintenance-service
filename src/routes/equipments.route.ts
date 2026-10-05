import { Router } from "express";
import {
  createEquipment,
  deleteEquipment,
  getEquipment,
  getEquipmentRequests,
  getEquipments,
  getEquipmentWeatherForecast,
  updateEquipment,
} from "../controllers/equipments.controller";
import { validate } from "../middlewares/validate.middleware";
import {
  createEquipmentSchema,
  equipmentParamsSchema,
  equipmentsQuerySchema,
  updateEquipmentSchema,
} from "../schemas/equipments/equipments.schema";
import { weatherQuerySchema } from "../schemas/weather/weather.schema";
import { authorization } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/rbac.middleware";

const router = Router();

router
  .route("/")
  .get(authorization, validate({ query: equipmentsQuerySchema }), getEquipments)
  .post(
    authorization,
    requireRole("admin"),
    validate({ body: createEquipmentSchema }),
    createEquipment,
  );
router
  .route("/:id")
  .get(authorization, validate({ params: equipmentParamsSchema }), getEquipment)
  .patch(
    authorization,
    requireRole("admin"),
    validate({ params: equipmentParamsSchema, body: updateEquipmentSchema }),
    updateEquipment,
  )
  .delete(
    authorization,
    requireRole("admin"),
    validate({ params: equipmentParamsSchema }),
    deleteEquipment,
  );
router
  .route("/:id/requests")
  .get(
    authorization,
    validate({ params: equipmentParamsSchema }),
    getEquipmentRequests,
  );
router
  .route("/:id/weather")
  .get(
    authorization,
    validate({ params: equipmentParamsSchema, query: weatherQuerySchema }),
    getEquipmentWeatherForecast,
  );

export default router;
