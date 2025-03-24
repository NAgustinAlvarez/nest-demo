import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";
export class UserDto {
  @ApiProperty({ description: "El nombre es obligatorio", example: "Nicolás" })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  /** La contraseña deber ser dificil @example:123rtesa-_-sd& */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;
  @ApiProperty()
  @IsEmpty()
  isAdmin: boolean;
}
