import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { File } from "./files.Entity";
import { Repository } from "typeorm";
import { Todo } from "./todos.entity";

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private readonly filesRepository: Repository<File>,
  ) {}
  async saveFile({
    name,
    mimeType,
    data,
    todo,
  }: {
    name: string;
    mimeType: string;
    data: Buffer;
    todo: Todo;
  }) {
    const file = new File();
    file.name = name;
    file.data = data;
    file.todo = todo;
    file.mimeType = mimeType;
    return await this.filesRepository.save(file);
  }
}
