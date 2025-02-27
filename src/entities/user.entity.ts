import {
  Entity,
  Column,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Task } from 'src/entities/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  description: string;

  // 多对多关联任务
  @ManyToMany(() => Task, (task) => task.users)
  @JoinTable() // 自动生成中间表 role_tasks（默认名称）
  tasks: Task[];
}
