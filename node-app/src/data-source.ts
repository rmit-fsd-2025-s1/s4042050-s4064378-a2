import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Candidate } from "./entity/Candidate";
import { Lecturer } from "./entity/Lecturer";
import { Application } from "./entity/Application";
import { Role } from "./entity/Role";
import { Course } from "./entity/Course";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "209.38.26.237",
  port: 3306,
  username: "S4064378",
  password: "Aa@2235023",
  database: "S4064378",
  // synchronize: true will automatically create database tables based on entity definitions
  // and update them when entity definitions change. This is useful during development
  // but should be disabled in production to prevent accidental data loss.
  synchronize: true,
  logging: true,
  entities: [User, Candidate, Lecturer, Application, Course, Role],
  migrations: [],
  subscribers: [],
});
