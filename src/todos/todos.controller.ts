import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoDto } from './dto/todo.dto';
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

}
