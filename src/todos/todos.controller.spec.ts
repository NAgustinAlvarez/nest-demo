/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from "@nestjs/testing";
import { TodosController } from "./todos.controller";
import { TodosService } from "./todos.service";
import { FilesService } from "./filesService";
import { Todo } from "./todos.entity";
import { Readable } from "node:stream";
import { File } from "./files.Entity";

describe("TodosController", () => {
  let todosController: TodosController;
  let mockTodosService: Partial<TodosService>;
  let mockFilesService: Partial<FilesService>;

  const mockTodo: Partial<Todo> = {
    id: 1,
    title: "todo1",
    description: "description",
    isCompleted: false,
  };

  const mockFile: Express.Multer.File = {
    fieldname: "example",
    originalname: "exaple.txt",
    encoding: "utf-8",
    mimetype: "text/plain",
    size: 0,
    stream: new Readable(),
    destination: "",
    filename: "",
    path: "",
    buffer: Buffer.from([]),
  };

  beforeEach(async () => {
    mockFilesService = {
      saveFile: jest
        .fn()
        .mockImplementation(({ name, mimeType, data, todo }) => {
          // Crear un objeto File que coincida con la firma esperada
          const file: File = {
            id: 1, // Asegúrate de que esto coincida con el tipo File
            name,
            mimeType,
            data,
            todo: {
              ...todo, // Usa el objeto `todo` proporcionado
              id: 1, // Asegúrate de que `todo` tenga un ID
              isCompleted: false, // Asegúrate de que `todo` tenga esta propiedad
            },
          };
          return Promise.resolve(file); // Devuelve una Promise<File>
        }),
    };

    mockTodosService = {
      getTodos: () => {
        return Promise.resolve([
          { ...mockTodo, id: 1, isCompleted: false } as Todo,
        ]);
      },
      findByid: (id: number) => {
        return Promise.resolve({
          ...mockTodo,
          id: 1,
          isCompleted: false,
        } as Todo);
      },
      createTodo: (todo: Partial<Todo>) => {
        return Promise.resolve({
          ...mockTodo,
          id: 1,
          isCompleted: false,
        } as Todo);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        { provide: TodosService, useValue: mockTodosService },
        { provide: FilesService, useValue: mockFilesService },
      ],
    }).compile();

    todosController = module.get<TodosController>(TodosController);
  });

  it("it should be defined", () => {
    expect(todosController).toBeDefined();
  });

  it("getTodos() should return an array of todos", async () => {
    const todos = await todosController.getTodos();
    expect(todos).toEqual([
      { id: 1, title: "todo1", description: "description", isCompleted: false },
    ]);
  });

  it("create Todo", async () => {
    const create = await todosController.createTodo(mockTodo);
    expect(create).toEqual({
      id: 1,
      title: "todo1",
      description: "description",
      isCompleted: false,
    });
  });

  it("uploadFile() should upload a file", async () => {
    const file = await todosController.uploadFile("1", mockFile);
    expect(file).toEqual({
      id: 1,
      name: "exaple.txt",
      mimeType: "text/plain",
      data: expect.any(Buffer), // Usamos expect.any para evitar problemas con el buffer
      todo: {
        id: 1,
        title: "todo1",
        description: "description",
        isCompleted: false,
      },
    });
  });
});
