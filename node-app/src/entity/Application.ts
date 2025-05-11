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
    year: number;
  }>;

  @Column("json")
  previousRoles: Array<{
    course: string;
    role: string;
  }>;

  @Column()
  status: "accepted" | "rejected" | "pending";

  @ManyToOne(() => Role, (role) => role.applications)
  role: Role;

  @ManyToOne(() => Candidate, (candidate) => candidate.applications)
  candidate: Candidate;
}
