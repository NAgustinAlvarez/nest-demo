import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ default: false })
  isAdmin: boolean;
  @Column()
  createdAT: string;
}
