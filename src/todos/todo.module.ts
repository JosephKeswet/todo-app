import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodosController } from './todos.controller';

@Module({
  providers: [TodoService],
  controllers: [TodosController],
})
export class TodoModule {}
