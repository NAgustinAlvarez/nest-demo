import { Injectable, Inject } from "@nestjs/common";
import { TodosRepository } from "./todos.respository";
import { Repository } from "typeorm";
import { Todo } from "./todos.entity";
import { InjectRepository } from "@nestjs/typeorm";
@Injectable()
export class TodosService {
  constructor(
    private todosRepository: TodosRepository,
    @Inject("ACESSTOKEN") private acesstoken: string,
    @InjectRepository(Todo) private todosDBrepository: Repository<Todo>,
  ) {}
  // getTodos() {
  //   return this.acesstoken === "contraseñaasd"
  //     ? this.todosRepository.getTodos()
  //     : "No es la contraseña";
  // }
  getTodos() {
    return this.todosDBrepository.find({ relations: ["files"] });
  }
  findByid(id: number) {
    return this.todosDBrepository.findOne({
      where: { id },
      relations: ["files"],
    });
  }
  createTodo(todo: Omit<Todo, "id">) {
    return this.todosDBrepository.save(todo);
  }
}
