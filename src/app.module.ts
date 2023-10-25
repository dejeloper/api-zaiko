import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './demo/tasks/tasks.module';
import { StateTasksModule } from './demo/state-tasks/state-tasks.module';
import { UsersModule } from './users/users.module';
import { UserStatesModule } from './user-states/user-states.module';

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
    UsersModule,
    UserStatesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
