import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodoService } from './todos.service';
import { TodosRepository } from './todos.repository';
import { CategoriesModule } from 'src/categories/categories.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';

@Module({
  controllers: [TodosController],
  providers: [TodoService],
  imports: [CategoriesModule, UsersModule, TypeOrmModule.forFeature([Todo])],
})
export class TodosModule {}
