import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./users.entity";

@Entity({
  name: "tasks",
})
export class TasksEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    name: "id_user",
  })
  idUser: string;

  @JoinColumn({ name: "id_user" })
  user: UserEntity;
}
