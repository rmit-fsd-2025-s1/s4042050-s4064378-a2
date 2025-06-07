import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Role } from "../entity/Role";

export class RoleController {
  private courseRepository = AppDataSource.getRepository(Role);

  async all(request: Request, response: Response) {
    const roles = await this.courseRepository.find();
    return response.json(roles);
  }
}
