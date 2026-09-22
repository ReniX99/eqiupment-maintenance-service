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

const router = Router();

router
  .route("/")
  .get(validate({ query: equipmentsQuerySchema }), getEquipments)
  .post(validate({ body: createEquipmentSchema }), createEquipment);
router
  .route("/:id")
  .get(validate({ params: equipmentParamsSchema }), getEquipment)
  .patch(
    validate({ params: equipmentParamsSchema, body: updateEquipmentSchema }),
    updateEquipment,
  )
  .delete(validate({ params: equipmentParamsSchema }), deleteEquipment);
router
  .route("/:id/requests")
  .get(validate({ params: equipmentParamsSchema }), getEquipmentRequests);
router
  .route("/:id/weather")
  .get(
    validate({ params: equipmentParamsSchema, query: weatherQuerySchema }),
    getEquipmentWeatherForecast,
  );

export default router;
