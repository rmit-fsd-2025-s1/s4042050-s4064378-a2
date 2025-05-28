import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Candidate } from "../entity/Candidate";
import { Course } from "../entity/Course";
import { Role } from "../entity/Role";
import { Application } from "../entity/Application";

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);
  const candidateRepo = AppDataSource.getRepository(Candidate);
  const courseRepo = AppDataSource.getRepository(Course);
  const roleRepo = AppDataSource.getRepository(Role);
  const appRepo = AppDataSource.getRepository(Application);

  // 👤 Create Users
  const user1 = userRepo.create({ firstName: "Alice", lastName: "Smith", email: "alice@example.com", password: "pass", avatarConfig: {} });
  const user2 = userRepo.create({ firstName: "Bob", lastName: "Lee", email: "bob@example.com", password: "pass", avatarConfig: {} });
  await userRepo.save([user1, user2]);

  // 🎓 Create Candidates
  const cand1 = candidateRepo.create({ user: user1, userId: user1.id });
  const cand2 = candidateRepo.create({ user: user2, userId: user2.id });
  await candidateRepo.save([cand1, cand2]);

  // 📚 Create Courses
  const course1 = courseRepo.create({ code: "COSC2640", name: "Full Stack Development" });
  const course2 = courseRepo.create({ code: "COSC2626", name: "Cloud Computing" });
  await courseRepo.save([course1, course2]);

  // 🎭 Create Roles
  const role1 = roleRepo.create({ name: "Tutor" });
  const role2 = roleRepo.create({ name: "Lab Assistant" });
  await roleRepo.save([role1, role2]);

  // 📄 Create Applications
  const app1 = appRepo.create({
    availability: "part-time",
    skills: ["React", "Node"],
    credentials: [{ degree: "BSc IT", institution: "RMIT", year: 2022 }],
    previousRoles: [{ course: "COSC1234", role: "Tutor" }],
    status: "accepted",
    course: course1,
    rank: 1,
    comment: "Great candidate",
    role: role1,
    candidate: cand1,
  });

  const app2 = appRepo.create({
    availability: "full-time",
    skills: ["AWS", "Docker"],
    credentials: [{ degree: "BSc CS", institution: "UniMelb", year: 2021 }],
    previousRoles: [{ course: "COSC5678", role: "Lab Assistant" }],
    status: "pending",
    course: course2,
    rank: 0,
    comment: "",
    role: role2,
    candidate: cand2,
  });

  await appRepo.save([app1, app2]);

  console.log("✅ Seed complete");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Error seeding", err);
  process.exit(1);
});
