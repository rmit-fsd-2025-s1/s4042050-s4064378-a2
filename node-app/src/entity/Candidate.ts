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

// candidate_id{pk}
// user_id{fk}
// availability
// credentials
// skills
// created_at
// updated_at

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  availability: string;

  @Column()
  credentials: string[];

  @Column({ unique: true })
  skills: string[];

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
