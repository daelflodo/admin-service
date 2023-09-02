import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../../task/entities/task.entity';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  name: string;

  @Column({ default: 1, nullable: true }) // Establece el valor predeterminado en true
  isEnabled: boolean;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}