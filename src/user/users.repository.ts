import { Injectable } from "@nestjs/common";
import { User } from "./user.interface";
@Injectable()
export class UsersRepository {
  private users = [
    {
      id: 1,
      name: "Juan",
      email: "juan.perez@example.com",
    },
    {
      id: 2,
      name: "María López",
      email: "maria.lopez@example.com",
    },
    {
      id: 3,
      name: "Carlos García",
      email: "carlos.garcia@example.com",
    },
    {
      id: 4,
      name: "Ana Rodríguez",
      email: "ana.rodriguez@example.com",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/require-await
  async getUsers() {
    return this.users;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getByid(id: number) {
    return this.users.find((user) => user.id === id);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getByName(name: string) {
    return this.users.find((user) => user.name == name);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async createUser(user: Omit<User, "id">) {
    const id = this.users.length + 1;
    this.users = [...this.users, { id, ...user }];
    return { id, ...user };
  }
}
