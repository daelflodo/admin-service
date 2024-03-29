import { IsString, IsNotEmpty, IsEmail, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsBoolean()
  readonly isEnabled: boolean = true;
}
