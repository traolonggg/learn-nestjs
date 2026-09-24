import * as fs from 'fs';
import * as path from 'path';
import { Todo } from 'src/todos/entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoStatus } from 'src/enums/todo-status.enum';
import { TodoPriority } from 'src/enums/todo-priority.enum';
import { Injectable } from '@nestjs/common';
const TODOS_FILE = path.join(__dirname, 'todos.json');
@Injectable()
export class TodosRepository {
  private readFromFile(): Todo[] {
    const data = fs.readFileSync(TODOS_FILE, 'utf-8');
    return JSON.parse(data) as Todo[];
  }
  private writeToFile(todo: Todo[]): void {
    fs.writeFileSync(TODOS_FILE, JSON.stringify(todo, null, 2));
  }
  private getNextId(todos: Todo[]): number {
    if (todos.length === 0) {
      return 1;
    }
    return todos[todos.length - 1].id + 1;
  }
  findAll(): Todo[] {
    return this.readFromFile();
  }
  findById(id: number) {
    const todos = this.readFromFile();
    return todos.find((todo) => todo.id === id);
  }
  findByTitle(title: string) {
    const todos = this.readFromFile();
    return todos.find((todo) => todo.title === title);
  }
  // create(createTodoDto: CreateTodoDto): Todo {
  //   const todos = this.readFromFile();
  //   const newTodo: Todo = {
  //     id: this.getNextId(todos),
  //     title: createTodoDto.title,
  //     description: createTodoDto.description ?? '',
  //     status: createTodoDto.status ?? TodoStatus.OPEN,
  //     priority: createTodoDto.priority ?? TodoPriority.MEDIUM,
  //     categoryId: createTodoDto.categoryId,
  //     userId: createTodoDto.userId,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   };
  //   todos.push(newTodo);
  //   this.writeToFile(todos);
  //   return newTodo;
  // }
  update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = this.readFromFile();
    const index = todo.findIndex((todo) => todo.id === id);
    if (index === -1) {
      return undefined;
    }
    todo[index] = {
      ...todo[index],
      ...updateTodoDto,
      updatedAt: new Date(),
    };
    this.writeToFile(todo);
    return todo[index];
  }
  delete(id: number): boolean {
    const todo = this.readFromFile();
    const index = todo.findIndex((todo) => todo.id === id);
    if (index === -1) {
      return false;
    }
    todo.splice(index, 1);
    this.writeToFile(todo);
    return true;
  }
}
