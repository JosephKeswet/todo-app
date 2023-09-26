import { Body, Controller, Delete, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteTodoDto, GetUserTodoDto, TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodosController {
    constructor(private todoService:TodoService,private prisma:PrismaService){}
    @UseGuards(JwtGuard)

    @Post('create')
    createTodo(@GetUser('id') user:User,@Body()  dto:TodoDto){
        
        
        return this.todoService.createTodo(dto,user.id)
    }

    @Delete('delete')
    @HttpCode(200)
    deleteTodo(@Body()  dto:DeleteTodoDto){
        const todoId = dto.id;
   
        return this.todoService.deleteTodo(todoId)
    }

    @Get('')
    getTodos(@Body() dto:GetUserTodoDto) {
        
        return this.todoService.getTodos(dto.id)
    }

}
