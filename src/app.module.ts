import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TodoModule } from './todos/todo.module';
import { TodoService } from './todos/todo.service';


@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),AuthModule,PrismaModule, TodoModule],
  controllers: [AppController],
  providers: [AppService,TodoService],
})
export class AppModule {}
