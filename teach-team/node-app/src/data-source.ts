import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Candidate } from "./entity/Candidate";
import { Lecturer } from "./entity/Lecturer";
import { Application } from "./entity/Application";
import { Role } from "./entity/Role";
import { Course } from "./entity/Course";

const isTest = process.env.NODE_ENV === "test";

export const AppDataSource = new DataSource(
  isTest
    ? {
        type: "sqlite",
        database: "test.sqlite", // ✅ file-based SQLite to avoid concurrency issues
        synchronize: true,
        dropSchema: true,        // ✅ resets schema for each test run
        logging: false,
        entities: [User, Candidate, Lecturer, Application, Course, Role],
      }
    : {
        type: "mysql",
        host: "209.38.26.237",
        port: 3306,
        username: "S4064378",
        password: "Aa@2235023",
        database: "S4064378",
        synchronize: true,
        logging: true,
        entities: [User, Candidate, Lecturer, Application, Course, Role],
        migrations: [],
        subscribers: [],
      }
);
