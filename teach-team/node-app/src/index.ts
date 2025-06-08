import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/user.routes";
import applicationsRouter from "./routes/applications.routes.";
import courseRoutes from "./routes/courses.routes";
import cors from "cors";
import rolesRoutes from "./routes/roles.routes";

export const app = express(); // ✅ export app for tests
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/teach_team", userRoutes);
app.use("/teach_team/applications", applicationsRouter);
app.use("/teach_team/courses", courseRoutes);
app.use("/teach_team/roles", rolesRoutes);

// ✅ Only start server if NOT in test mode
if (process.env.NODE_ENV !== "test") {
  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) =>
      console.log("Error during Data Source initialization:", error)
    );
}
