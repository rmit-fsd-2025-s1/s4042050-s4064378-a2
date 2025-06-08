import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Candidate } from "./entity/Candidate";
import { Lecturer } from "./entity/Lecturer";
import { Application } from "./entity/Application";
import { Role } from "./entity/Role";
import { Course } from "./entity/Course";
import dotenv from 'dotenv';
dotenv.config();

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
      type: process.env.DB_TYPE as any, // use 'as any' to satisfy TypeORM typing
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "3306"),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: true,
      entities: [User, Candidate, Lecturer, Application, Course, Role],
      migrations: [],
      subscribers: [],
    }
);
