import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course";
import { Lecturer } from "../entity/Lecturer";

export class CourseController {
  private courseRepository = AppDataSource.getRepository(Course);

  async all(request: Request, response: Response) {
    const courses = await this.courseRepository.find();
    return response.json(courses);
  }




  async getByUserId(request: Request, response: Response) {
    const userId = parseInt(request.params.userId);

    try {
      // Find lecturer using user ID
      const lecturer = await AppDataSource.getRepository(Lecturer).findOne({
        where: { userId },
      });

      if (!lecturer) {
        return response.status(404).json({ error: "Lecturer not found" });
      }

      // Fetch courses assigned to the lecturer
      const courses = await this.courseRepository.find({
        where: { lecturer: { id: lecturer.id } },
        relations: ["lecturer"],
      });

      return response.json(courses);
    } catch (err) {
      console.error("Error fetching courses by user ID:", err);
      return response.status(500).json({ error: "Failed to fetch courses" });
    }
  }
}
