import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Application } from "../entity/Application";
import { Candidate } from "../entity/Candidate";
import { Lecturer } from "../entity/Lecturer";

export class ApplicationLecturerController {
  // Get all applications
  async getAll(req: Request, res: Response) {
    try {
      const candidates = await AppDataSource.getRepository(Candidate).find({
        relations: [
          "user",
          "applications",
          "applications.role",
          "applications.course",
        ],
      });

      const result = candidates.map((c) => ({
        id: c.id,
        firstName: c.user.firstName,
        lastName: c.user.lastName,
        email: c.user.email,
        appliedRoles:
          c.applications?.map((a) => ({
            availability: a.availability,
            id: a.id,
            role: a.role.name,
            skills: a.skills,
            course: a.course
              ? {
                id: a.course.id,
                code: a.course.code,
                name: a.course.name,
              }
              : null,
            rank: a.rank,
            status: a.status,
            comment: a.comment ?? "",
          })) ?? [],
      }));

      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch applications" });
    }
  }

  // Get applications by lecturer userId
  async getByLecturer(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);

    try {
      const lecturer = await AppDataSource.getRepository(Lecturer).findOne({
        where: { userId },
      });

      if (!lecturer) {
        return res.status(404).json({ error: "Lecturer not found" });
      }

      const candidates = await AppDataSource.getRepository(Candidate).find({
        relations: [
          "user",
          "applications",
          "applications.role",
          "applications.course",
          "applications.course.lecturer",
        ],
      });

      const result = candidates
        .map((c) => {
          const filteredApplications = c.applications?.filter((a) => {
            return a.course?.lecturer?.id === lecturer.id;
          });

          return {
            id: c.id,
            firstName: c.user.firstName,
            lastName: c.user.lastName,
            email: c.user.email,
            appliedRoles:
              filteredApplications?.map((a) => ({
                availability: a.availability,
                id: a.id,
                role: a.role.name,
                skills: a.skills,
                course: a.course
                  ? {
                    id: a.course.id,
                    code: a.course.code,
                    name: a.course.name,
                  }
                  : null,
                rank: a.rank,
                status: a.status,
                comment: a.comment ?? "",
              })) ?? [],
          };
        })
        .filter((r) => r.appliedRoles.length > 0);

      return res.json(result);
    } catch (err) {
      console.error("Error in /by-lecturer route:", err);
      return res.status(500).json({ error: "Failed to fetch filtered applications" });
    }
  }

  // Update application (status, rank, comment)
  async update(req: Request, res: Response) {
    const applicationId = parseInt(req.params.id);
    const { status, rank, comment } = req.body;

    // Validate status
    const validStatuses = ["accepted", "rejected", "pending"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value. Must be one of: accepted, rejected, pending." });
    }

    // Validate rank if status is accepted
    if (status === "accepted") {
      if (typeof rank !== "number" || isNaN(rank) || rank <= 0 || !Number.isInteger(rank)) {
        return res.status(400).json({ error: "Rank must be a positive integer when status is 'accepted'." });
      }
    }

    // Validate comment if present
    if (comment !== undefined && typeof comment !== "string") {
      return res.status(400).json({ error: "Comment must be a string." });
    }

    try {
      const appRepo = AppDataSource.getRepository(Application);
      const application = await appRepo.findOne({ where: { id: applicationId } });

      if (!application) {
        return res.status(404).json({ error: "Application not found." });
      }

      // Apply updates
      application.status = status;
      application.rank = status === "accepted" ? rank : 0;
      application.comment = comment ?? "";

      await appRepo.save(application);

      return res.json({
        message: "Application updated successfully.",
        application,
      });
    } catch (err) {
      console.error("Error updating application:", err);
      return res.status(500).json({ error: "Failed to update application." });
    }
  }

  // Create new application (optional if already implemented)
  async create(req: Request, res: Response) {
    // Assuming the save logic is implemented here or delegated to a service
    // You can copy from your current inline logic if needed
    res.status(501).json({ message: "Not implemented" });
  }

  // Get all applications by candidate ID
  async getByCandidateId(req: Request, res: Response) {
    // Stub - implement if needed
    res.status(501).json({ message: "Not implemented" });
  }
}
