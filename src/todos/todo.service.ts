import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteTodoDto, TodoDto } from './dto/todo.dto';

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

            return {
                success: true,
                msg:'Todo created successfully',
                todo
            };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
              if (error.code === 'P2002') {
                throw new ForbiddenException(`Can't have todos with same title`);
              }
            }
            throw error;
        }
    }

    async deleteTodo(id:number){
        try {
            const todo = await this.prisma.todos.delete({
                where:{
                    id,
                }
            })
            todo;
            return {
                success: true,
                msg:'You have successfully deleted this todo'
            }
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                  throw new ForbiddenException(`Todo does not exist`);
                }
              }
              throw error;
        }
    }
}
