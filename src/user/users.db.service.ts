import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class userDbService {
  getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async saveUser(user: Omit<User, "id">) {
    return await this.userRepository.save(user);
  }
  getUser(id: string) {
    try {
      return this.userRepository.findOne({ where: { id } });
    } catch {
      throw new Error("no se encuentra id");
    }
  }
  async getUsers() {
    try {
      return this.userRepository.find();
    } catch {
      throw new Error("no se encuentra id");
    }
  }
  async getUserByName(name: string) {
    return this.userRepository.findOne({ where: { name } });
  }
  async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
