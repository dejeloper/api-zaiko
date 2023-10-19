import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './demo/tasks/tasks.module';
import { StateTasksModule } from './demo/state-tasks/state-tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5436,
      username: 'postgres',
      password: 'postgres',
      database: 'zaiko_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TasksModule,
    StateTasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
