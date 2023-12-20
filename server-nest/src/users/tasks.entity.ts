import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ownerID: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column({ nullable: true })
  date: Date;

  @Column({ default: 'pending' })
  status: string;

  @Column()
  catogery: string;
}
