import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const courseRepo = AppDataSource.getRepository(Course);
    const courses = await courseRepo.find();

    return res.json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    return res.status(500).json({ error: "Failed to fetch courses" });
  }
});

export default router;
