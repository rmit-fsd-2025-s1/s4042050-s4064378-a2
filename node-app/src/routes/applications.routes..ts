import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Candidate } from "../entity/Candidate";
import { Application } from "../entity/Application";
import { Role } from "../entity/Role";
import { User } from "../entity/User";
import { Course } from "../entity/Course";
import { ApplicationController } from "../controller/ApplicationController";

const router = Router();
const applicationController = new ApplicationController();

router.get("/", async (req, res) => {
  try {
    const candidates = await AppDataSource.getRepository(Candidate).find({
      relations: [
        "user",
        "applications",
        "applications.role",
        "applications.course", // ✅ now from Application directly
      ],
    });
    const result = candidates.map((c) => {
      return {
        id: c.id,
        firstName: c.user.firstName,
        lastName: c.user.lastName,
        email: c.user.email,
        skills: c.applications?.[0]?.skills ?? [],
        availability: c.applications?.[0]?.availability ?? "",
        appliedRoles:
          c.applications?.map((a) => ({
            id: a.id,
            role: a.role.name,
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
    });

    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch applications" });
  }
});

router.patch("/:id", async (req, res) => {
  const applicationId = parseInt(req.params.id, 10);
  const { status, rank, comment } = req.body;

  try {
    const appRepo = AppDataSource.getRepository(Application);
    const application = await appRepo.findOne({ where: { id: applicationId } });

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // ✅ Update allowed fields
    application.status = status;
    application.rank = status === "accepted" ? rank : 0;
    application.comment = comment ?? "";

    await appRepo.save(application);

    return res.json({
      message: "Application updated successfully",
      application,
    });
  } catch (err) {
    console.error("Error updating application:", err);
    return res.status(500).json({ error: "Failed to update application" });
  }
});

router.post("/", async (req, res) => {
  await applicationController.save(req, res);
});

export default router;
