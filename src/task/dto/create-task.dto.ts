import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly status: string = 'Pending';

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
}
