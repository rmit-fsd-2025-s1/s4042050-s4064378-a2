import { Router } from "express";
import { ApplicationLecturerController } from "../controller/ApplicationLecturerController";
import { ApplicationController } from "../controller/ApplicationController";

const router = Router();
const controller = new ApplicationLecturerController();
const applicationController = new ApplicationController()

router.get("/", controller.getAll.bind(controller));
router.get("/by-lecturer/:userId", controller.getByLecturer.bind(controller));
router.patch("/:id", controller.update.bind(controller));
router.post("/", async (req, res) => {
  await applicationController.save(req, res);
});

router.get("/", async (req, res) => {
  await applicationController.all(req, res);
});
router.get("/:id", async (req, res) => {
  await applicationController.allByCandidateId(req, res);
});

export default router;