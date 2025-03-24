// import { Inject, Injectable } from "@nestjs/common";
// import { UsersRepository } from "./users.repository";
// import { User } from "./user.interface";

import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  // constructor(
  //   private userRepository: UsersRepository,
  //   @Inject("API_USERS") private apiUsers: User[],
  // ) {}
  // getUserByName(name: string) {
  //   return this.userRepository.getByName(name);
  // }
  // getUserById(id: number) {
  //   return this.userRepository.getByid(id);
  // }
  // createUser(user: Omit<User, "id">) {
  //   return this.userRepository.createUser(user);
  // }
  // async getUsers() {
  //   const dbUsers = await this.userRepository.getUsers();
  //   const users = [...dbUsers, this.apiUsers];
  //   return users;
  // }
}
