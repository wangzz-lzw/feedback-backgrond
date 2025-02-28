import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn() // ✅ 将 `taskId` 作为自增主键
  taskId: number;

  @Column()
  taskName: string;

  @Column()
  taskContent: string;

  @Column()
  taskSubTitle: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: string;

  @UpdateDateColumn({ type: 'timestamp' })
  modifyTime: string;

  @Column({ type: 'int', nullable: true })
  modifyUserId: number;

  @Column({
    type: 'enum',
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending',
  })
  status: string;

  @Column()
  index: number;
  // 多对多关联角色
  @ManyToMany(() => User, (user) => user.tasks)
  users: User[];
}
