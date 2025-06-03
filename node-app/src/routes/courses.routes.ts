import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course";
import { CourseController } from "../controller/CourseController";

const router = Router();
const courseController = new CourseController();

// router.get("/courses", async (req, res) => {
//   try {
//     const courseRepo = AppDataSource.getRepository(Course);
//     const courses = await courseRepo.find();

//     return res.json(courses);
//   } catch (err) {
//     console.error("Error fetching courses:", err);
//     return res.status(500).json({ error: "Failed to fetch courses" });
//   }
// });

router.get("/", async (req, res) => {
  await courseController.all(req, res);
});

export default router;
