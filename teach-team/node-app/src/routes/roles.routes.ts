import { Router } from "express";
import { AppDataSource } from "../data-source";

import { RoleController } from "../controller/RoleController";

const router = Router();
const roleController = new RoleController();

router.get("/", async (req, res) => {
  await roleController.all(req, res);
});

export default router;
