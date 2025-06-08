import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Lecturer } from "./Lecturer";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
semester?: number;

  @ManyToOne(() => Lecturer, (lecturer) => lecturer.courses, {
    onDelete: "SET NULL",
    nullable: true,
  })
  lecturer: Lecturer;
}
