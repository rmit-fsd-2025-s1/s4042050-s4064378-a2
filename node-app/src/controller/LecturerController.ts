import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Lecturer } from "../entity/Lecturer";

export class LecturerController {
  private lecturerRepository = AppDataSource.getRepository(Lecturer);

  async save(request: Request, response: Response) {
    const { user_id } = request.body;
    const lecturer = new Lecturer();
    lecturer.userId = user_id;
    try {
      const savedLecturer = await this.lecturerRepository.save(lecturer);
      return response.status(201).json(savedLecturer);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Error creating candidate", error });
    }
  }
}
