import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  isCompleted: boolean;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  id:number
}


export class DeleteTodoDto {

  @IsNotEmpty()
  @IsNumber()
  id:number
}

export class GetUserTodoDto {

  @IsNotEmpty()
  @IsNumber()
  id:number
}