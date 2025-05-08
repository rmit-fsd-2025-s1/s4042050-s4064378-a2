import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { Candidate } from "./Candidate";
import { Lecturer } from "./Lecturer";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Optional 1:1 with Candidate
  @OneToOne(() => Candidate, (candidate) => candidate.user)
  candidate?: Candidate;

  // Optional 1:1 with Lecturer
  @OneToOne(() => Lecturer, (lecturer) => lecturer.user)
  lecturer?: Lecturer;
}
