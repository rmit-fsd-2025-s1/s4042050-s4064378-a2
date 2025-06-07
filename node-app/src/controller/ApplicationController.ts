import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Application } from "../entity/Application";

export class ApplicationController {
  private applicationRepository = AppDataSource.getRepository(Application);

  async save(request: Request, response: Response) {
    try {
      const savedLecturer = await this.applicationRepository.save({
        ...request.body,
      });
      return response.status(201).json(savedLecturer);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Error creating application", error });
    }
  }

  async all(request: Request, response: Response) {
    const applications = await this.applicationRepository.find();
    return response.json(applications);
  }

  async allByCandidateId(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    try {
      const applications = await this.applicationRepository.find({
        where: { candidate: { id } },
        relations: ["candidate", "course", "role"],
      });

      if (!applications) {
        return response.json([]);
      }
      return response.json(applications);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Error getting applications", error });
    }
  }
}
