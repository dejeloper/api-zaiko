import { StateTask } from 'src/demo/state-tasks/entities/state-task.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Tasks')
export class Task {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => StateTask, (stateTask) => stateTask.id, {
    eager: true,
  })
  state: StateTask;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt?: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleteAt: Date;
}
