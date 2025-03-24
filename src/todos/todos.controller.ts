/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { TodosService } from "./todos.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesService } from "./filesService";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("Todos")
@Controller("todos") //la entrada del controler sería /users
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly filesService: FilesService,
  ) {}
  @Get()
  getTodos() {
    return this.todosService.getTodos();
  }
  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @Body("id") id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const todoId = Number(id); // Convertir el ID a número
    if (isNaN(todoId)) {
      throw new BadRequestException("ID inválido"); // Evita errores en la DB
    }
    const todo = await this.todosService.findByid(todoId);
    if (!todo) {
      throw new NotFoundException("Todo no encontrado");
    }

    return this.filesService.saveFile({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      name: file.originalname,
      mimeType: file.mimetype,
      data: file.buffer,
      todo,
    });
  }
  @Post()
  async createTodo(@Body() todo: any) {
    return await this.todosService.createTodo(todo);
  }
}
