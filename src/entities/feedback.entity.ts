import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  type: number;
  @Column()
  content: string;
  @Column()
  focusPage: string;
  @Column()
  phone: string;
  @Column()
  qq: string;
  @Column()
  fileData: string;
}
