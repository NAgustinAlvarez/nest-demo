import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { userDbService } from "./users.db.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { CloudinaryService } from "./cloudinaryService";
import { AuthService } from "./auth.service";
// import { SharedModule } from "../shared/shared/shared.service";
import { SharedModule } from "../shared/shared/shared.service";
@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Para acceder a la entidad User
    SharedModule,
  ],
  controllers: [UserController],
  providers: [UserService, userDbService, CloudinaryService, AuthService],
})
export class UserModule {}
