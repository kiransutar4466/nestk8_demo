import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  country: string;

  @IsString()
  @IsOptional()
  password: string;
}

export class UserOutputDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  country: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  country: string;
}
