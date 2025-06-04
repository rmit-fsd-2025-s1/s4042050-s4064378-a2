import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from "./Role";
import { Candidate } from "./Candidate";
import { Course } from "./Course";

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  availability: "part-time" | "full-time";

  @Column("simple-array")
  skills: string[];

  @Column("json")
  credentials: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;

  @Column("json")
  previousRoles: Array<{
    course: string;
    role: string;
  }>;

  @Column()
  status: "accepted" | "rejected" | "pending";

  @Column({ type: "int", default: 0 })
  rank: number;

  @Column({ type: "text", nullable: true })
  comment: string;

  @ManyToOne(() => Role, (role) => role.applications)
  role: Role;

  @ManyToOne(() => Candidate, (candidate) => candidate.applications)
  candidate: Candidate;

  @ManyToOne(() => Course, { onDelete: "CASCADE" })
  course: Course;
}
