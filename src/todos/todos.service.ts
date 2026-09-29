import { query } from 'axios';
import { QueryParamsDto } from './dto/query-params.dto';
import { TodosRepository } from './todos.repository';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from 'src/todos/entities/todo.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { UsersService } from 'src/users/users.service';
import { createWriteStream } from 'fs';
import { STATUS_CODES } from 'http';
import { TodoNotFoundException } from './exception/todo-not-found-exception';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { title } from 'process';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
    private readonly categoriesService: CategoriesService,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
  ) {}
  async findAll(queryParamsDto: QueryParamsDto): Promise<Todo[]> {
    const page = queryParamsDto.page ?? 1;
    const limit = queryParamsDto.limit ?? 10;
    const start = (page - 1) * limit;
    const where = queryParamsDto.priority
      ? { priority: queryParamsDto.priority }
      : {};
    let todos = await this.todosRepository.find({
      where,
      take: limit,
      skip: start,
    });
    return todos;
  }
  async findById(id: number) {
    const todos = await this.todosRepository.findOne({ where: { id } });
    if (!todos) {
      throw new TodoNotFoundException(id);
    }
    return todos;
  }
  async create(createTodoDto: CreateTodoDto) {
    const user = await this.usersService.findById(createTodoDto.userId);
    if (!user) {
      throw new NotFoundException({
        message: `Khong tim thay user voi id ${createTodoDto.userId}`,
        errorCode: 'USER_NOT_FOUND',
        field: 'id',
        statusCode: 400,
      });
    }
    if (createTodoDto.categoryId) {
      const category = this.categoriesService.findById(
        createTodoDto.categoryId,
      );
      if (!category) {
        throw new NotFoundException({
          message: `Khong tim thay category voi id ${createTodoDto.categoryId}`,
          errorCode: 'CATEGORY_NOT_FOUND',
          field: 'id',
          statusCode: 400,
        });
      }
    }
    const existingTodo = await this.todosRepository.findOne({
      where: { title: createTodoDto.title },
    });
    if (existingTodo) {
      throw new BadRequestException({
        message: `Todo voi title ${createTodoDto.title} da ton tai`,
        errorCode: 'TODO_TITLE_DUPLICATE',
        field: 'title',
        statusCode: 400,
      });
    }
    return this.dataSource.transaction(async (manager) => {
      const saveTodo = await manager.save(Todo, createTodoDto);
      await manager.update(
        User,
        { id: createTodoDto.userId },
        { lastActivityAt: new Date() },
      );
    });
  }
  async update(id: number, updateTodoDto: UpdateTodoDto) {
    if (updateTodoDto.categoryId) {
      const category = await this.categoriesService.findById(
        updateTodoDto.categoryId,
      );
      if (!category) {
        throw new NotFoundException(
          `Khong tim thay category voi id ${updateTodoDto.categoryId}`,
        );
      }
    }
    const todo = await this.todosRepository.findOne({ where: { id } });
    if (!todo) {
      throw new TodoNotFoundException(id);
    }
    Object.assign(todo, updateTodoDto);
    return this.todosRepository.save(todo);
  }
  async delete(id: number) {
    const deleted = await this.todosRepository.delete(id);
    if (!deleted.affected) {
      throw new TodoNotFoundException(id);
    }
  }
}
