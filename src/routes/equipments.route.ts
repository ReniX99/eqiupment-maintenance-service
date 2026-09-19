import { Router } from "express";
import {
  createEquipment,
  getEquipment,
  getEquipments,
} from "../controllers/equipments.controller";

const router = Router();

router.route("/").get(getEquipments).post(createEquipment);
router.route("/:id").get(getEquipment);

export default router;
