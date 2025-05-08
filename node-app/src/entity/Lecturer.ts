import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Lecturer {
  @PrimaryGeneratedColumn()
  id: number;

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
}
