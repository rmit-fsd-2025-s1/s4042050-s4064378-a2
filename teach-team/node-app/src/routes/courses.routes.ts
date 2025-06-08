import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course";
import { CourseController } from "../controller/CourseController";

const router = Router();
const courseController = new CourseController();


router.get("/", async (req, res) => {
  await courseController.all(req, res);
});

router.get("/by-user/:userId", async (req, res) => {
  await courseController.getByUserId(req, res);
});

export default router;
