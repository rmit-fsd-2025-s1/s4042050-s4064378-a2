import { Router } from "express";
import { ApplicationLecturerController } from "../controller/ApplicationLecturerController";

const router = Router();
const controller = new ApplicationLecturerController();

router.get("/", controller.getAll.bind(controller));
router.get("/by-lecturer/:userId", controller.getByLecturer.bind(controller));
router.patch("/:id", controller.update.bind(controller));
router.post("/", controller.create.bind(controller));
router.get("/:id", controller.getByCandidateId.bind(controller));

export default router;