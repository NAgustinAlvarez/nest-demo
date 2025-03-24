import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `Estas ejecutando un método ${req.method} en la ruta ${req.url}`,
    );
    next();
  }
}

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  console.log(`Estas ejecutando un método ${req.method} en la ruta ${req.url}`);
  next();
}
