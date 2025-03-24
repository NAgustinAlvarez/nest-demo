/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { Role } from "src/user/roles.enum";
import { Admin } from "typeorm";

function validateRequest(request: Request) {
  const token = request.headers["token"];
  return token === "1234";
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers["authorization"]?.split(" ")[1] ?? " ";
    if (!token) {
      throw new UnauthorizedException("Bearer token not found");
    }
    try {
      const secret = process.env.JWT_KEY;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const payload = this.jwtService.verify(token, { secret });
      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);
      request.user = payload; //info del usuario autenticado
      console.log(payload);
      return true;
    } catch (err) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
