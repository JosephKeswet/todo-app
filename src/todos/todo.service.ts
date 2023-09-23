import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoDto } from './dto/todo.dto';

@Injectable()
export class TodoService {
    constructor(private prisma: PrismaService){}

    async createTodo(dto:TodoDto){
        try {
            const todo = await this.prisma.todos.create({
                data:{
                    title:dto.title,
                    description:dto.description,
                    isCompleted:dto.isCompleted,
                    user:{connect:{id:dto.id}}
               
                }
            })

            return todo;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
              if (error.code === 'P2002') {
                throw new ForbiddenException(`Can't have todos with same name`);
              }
            }
            throw error;
        }
    }
}
