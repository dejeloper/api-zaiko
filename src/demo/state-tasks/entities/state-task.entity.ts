import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from 'src/demo/tasks/entities/task.entity';

@Entity('StateTasks')
export class StateTask {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt?: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleteAt: Date;

  @OneToMany(() => Task, (task) => task.state)
  task: Task[];
}
