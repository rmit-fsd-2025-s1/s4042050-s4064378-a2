import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Application } from "./Application";

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // --- One-to-One Relationship ---
  @OneToOne(() => User, { onDelete: "CASCADE" }) // Delete Candidate if User is deleted
  @JoinColumn({ name: "user_id" }) // Foreign key column in candidates table
  user: User;

  @Column({ name: "user_id", unique: true }) // Explicit user_id column
  userId: number; // For easier querying

  @OneToMany(() => Application, (application) => application.candidate)
  applications?: Application[];
}
