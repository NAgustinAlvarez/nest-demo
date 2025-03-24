import { Module } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { TodosController } from "./todos.controller";
import { TodosRepository } from "./todos.respository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { File } from "./files.Entity";
import { Todo } from "./todos.entity";
import { FilesService } from "./filesService";
const acces = "contraseña";

@Module({
  imports: [TypeOrmModule.forFeature([File, Todo])],
  providers: [
    TodosService,
    TodosRepository,
    { provide: "ACESSTOKEN", useValue: acces },
    FilesService,
  ],
  controllers: [TodosController],
})
export class TodosModule {}
