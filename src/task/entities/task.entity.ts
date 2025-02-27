import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
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
}
