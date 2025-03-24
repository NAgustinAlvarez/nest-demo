/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { userDbService } from "./users.db.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Role } from "./roles.enum";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: userDbService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: Omit<User, "id">) {
    const dbUser = await this.userService.getUserByEmail(user.email);
    if (dbUser) {
      throw new BadRequestException("Ya existe un usuario con este correo.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException(
        "No se pudo hacer el hash de la contraseña.",
      );
    }

    return await this.userService.saveUser({
      ...user,
      password: hashedPassword,
    });
  }

  async signIn(email: string, password: string) {
    // Busca al usuario por su email
    const dbUser = await this.userService.getUserByEmail(email);
    if (!dbUser) {
      throw new BadRequestException("Usuario no encontrado.");
    }
    // Compara la contraseña proporcionada con la almacenada en la base de datos
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const isPasswordValid = await bcrypt.compare(password, dbUser.password);
    if (!isPasswordValid) {
      throw new BadRequestException("Contraseña inválida.");
    }

    // Crea el payload para el token JWT
    const userPayload = {
      sub: dbUser.id, // "sub" es el estándar para el ID del usuario en JWT
      id: dbUser.id,
      email: dbUser.email,
      roles: [dbUser.isAdmin ? Role.Admin : Role.User],
    };

    // Genera el token JWT
    const token = this.jwtService.sign(userPayload);

    // Retorna el mensaje de éxito y el token
    return { success: "Usuario logueado correctamente.", token };
  }
}
