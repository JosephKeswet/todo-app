import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteTodoDto, TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodosController {
    constructor(private todoService:TodoService,private prisma:PrismaService){}

    @Post('create')
    createTodo(@Body()  dto:TodoDto){
        const user = this.prisma.user.findUnique({
            where:{
                id:dto.id
            }
        })
        return this.todoService.createTodo(dto)
    }

    @Delete('delete')
    @HttpCode(200)
    deleteTodo(@Body()  dto:DeleteTodoDto){
        const todoId = dto.id;
   
        return this.todoService.deleteTodo(todoId)
    }

}
