import { Router } from "express";
import {
  createEquipment,
  deleteEquipment,
  getEquipment,
  getEquipments,
} from "../controllers/equipments.controller";

const router = Router();

router.route("/").get(getEquipments).post(createEquipment);
router.route("/:id").get(getEquipment).delete(deleteEquipment);

export default router;
