import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodoService } from './todos.service';
import { TodosRepository } from './todos.repository';
import { CategoriesModule } from 'src/categories/categories.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { RequestMiddleware } from 'src/common/middleware/request-id.middleware';
import { TODOS_CONFIG } from 'src/types/todo';

@Module({
  controllers: [TodosController],
  providers: [
    TodoService,
    {
      provide: TODOS_CONFIG,
      useValue: {
        maxValuesPerUser: 100,
        maxTitleLength: 200,
        defaultPageSize: process.env.NODE_ENV === 'development' ? 10 : 20,
      },
    },
  ],
  imports: [CategoriesModule, UsersModule, TypeOrmModule.forFeature([Todo])],
})
export class TodosModule {
  //Ap dung Middlewares cho 1 module nhat dinh thi dung cach nay
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(RequestMiddleware).forRoutes('todos');
  // }
}
