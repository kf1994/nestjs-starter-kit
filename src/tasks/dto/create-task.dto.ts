import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'title is required' })
  @IsString({ message: 'title should be a string' })
  @MaxLength(100)
  title: string;

  @IsNotEmpty({ message: 'description is required' })
  @IsString({ message: 'description should be a string' })
  @MaxLength(600)
  description: string;
}
