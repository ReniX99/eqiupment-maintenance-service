import { Router } from "express";
import {
  createEquipment,
  deleteEquipment,
  getEquipment,
  getEquipments,
  updateEquipment,
} from "../controllers/equipments.controller";

const router = Router();

router.route("/").get(getEquipments).post(createEquipment);
router
  .route("/:id")
  .get(getEquipment)
  .patch(updateEquipment)
  .delete(deleteEquipment);

export default router;
