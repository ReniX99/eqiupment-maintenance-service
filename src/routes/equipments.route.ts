import { Router } from "express";
import {
  getEquipment,
  getEquipments,
} from "../controllers/equipments.controller";

const router = Router();

router.route("/").get(getEquipments);
router.route("/:id").get(getEquipment);

export default router;
