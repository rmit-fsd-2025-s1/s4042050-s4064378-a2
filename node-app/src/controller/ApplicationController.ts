import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Application } from "../entity/Application";

export class ApplicationController {
  private applicationRepository = AppDataSource.getRepository(Application);

  async save(request: Request, response: Response) {
    const { user_id } = request.body;
    const application = new Application();
    console.log(request.body);
    // application.availability =
    // application.course =
    // application.availability
    try {
      const savedLecturer = await this.applicationRepository.save({
        ...request.body,
      });
      return response.status(201).json(savedLecturer);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Error creating candidate", error });
    }
  }
}
