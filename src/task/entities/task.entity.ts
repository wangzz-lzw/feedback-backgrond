import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskName: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: string;

  @UpdateDateColumn({ type: 'timestamp' })
  modifyTime: string;

  @ManyToOne(() => User, (user) => user.tasks, {
    nullable: true,
    eager: false,
  })
  modifyUser: User;

  @Column({ type: 'int', nullable: true })
  modifyUserId: number;
}
