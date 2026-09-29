import { NestApplication, NestFactory } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { error } from 'console';
import { AppModule } from 'src/app.module';
import { Category } from 'src/categories/entities/category.entity';
import { Todo } from 'src/todos/entities/todo.entity';
import { User } from 'src/users/entities/user.entity';
import { readFromFile } from 'src/utils/file';
import { Repository } from 'typeorm';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userRepository = await app.get<Repository<User>>(
    getRepositoryToken(User),
  );
  const categoryRepository = await app.get<Repository<Category>>(
    getRepositoryToken(Category),
  );
  const todosRepository = await app.get<Repository<Todo>>(
    getRepositoryToken(Todo),
  );
  const user = readFromFile<User[]>('users.json');
  const category = readFromFile<Category[]>('categories.json');
  const todo = readFromFile<Todo[]>('todos.json');
  await userRepository.save(user);
  await categoryRepository.save(category);
  await todosRepository.save(todo);
  await app.close();
}
seed().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
