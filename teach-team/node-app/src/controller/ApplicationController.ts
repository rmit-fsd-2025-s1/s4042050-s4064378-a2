import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Application } from "../entity/Application";

export class ApplicationController {
  private applicationRepository = AppDataSource.getRepository(Application);

  // async save(request: Request, response: Response) {
  //   try {
  //     const savedLecturer = await this.applicationRepository.save({
  //       ...request.body,
  //     });
  //     return response.status(201).json(savedLecturer);
  //   } catch (error) {
  //     return response
  //       .status(400)
  //       .json({ message: "Error creating application", error });
  //   }
  // }

  async save(request: Request, response: Response) {
    const {
      candidate,
      course,
      role,
      status,
      rank,
      comment,
      availability,
      skills = [],
      credentials = [],
      previousRoles = [],
    } = request.body;

    // 🔐 Validate required nested IDs
    if (
      !candidate?.id ||
      !course?.id ||
      !role?.id ||
      !availability ||
      !status
    ) {
      return response.status(400).json({
        message: "Missing required fields: candidate.id, course.id, role.id, availability, and status are required.",
      });
    }

    // 🔐 Enforce status must be 'pending'
    if (status !== "pending") {
      return response.status(400).json({
        message: "Status must be 'pending' when creating a new application.",
      });
    }

    // 🔐 Validate availability
    const validAvailability = ["part-time", "full-time"];
    if (!validAvailability.includes(availability)) {
      return response.status(400).json({ message: "Invalid availability value." });
    }

    // 🔐 Validate skills
    if (!Array.isArray(skills) || skills.some((s) => typeof s !== "string")) {
      return response.status(400).json({ message: "Skills must be an array of strings." });
    }

    // 🔐 Validate credentials
    if (
      !Array.isArray(credentials) ||
      credentials.some(
        (c) =>
          typeof c.degree !== "string" ||
          typeof c.institution !== "string" ||
          typeof c.year !== "string"
      )
    ) {
      return response.status(400).json({ message: "Invalid credentials format." });
    }

    // 🔐 Validate previousRoles
    if (
      !Array.isArray(previousRoles) ||
      previousRoles.some(
        (p) => typeof p.course !== "string" || typeof p.role !== "string"
      )
    ) {
      return response.status(400).json({ message: "Invalid previousRoles format." });
    }

    try {
      // 🧠 Save application with only accepted structure
      const savedApplication = await this.applicationRepository.save({
        candidate: { id: candidate.id },
        course: { id: course.id },
        role: { id: role.id },
        status: "pending",
        rank: 0,
        comment: comment ?? "",
        availability,
        skills,
        credentials,
        previousRoles,
      });

      return response.status(201).json(savedApplication);
    } catch (error) {
      return response.status(400).json({
        message: "Error creating application",
        error,
      });
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
