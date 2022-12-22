import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { TasksModel } from "../../../models/tasks.model";
import { UserModel } from "../../../models/user.model";
import { TasksEntity } from "../../../shared/entities/tasks.entity";
import { UserRepository } from "../../user/repositories/user.repository";

interface UpdateTasksDTO {
  id: string;
  title?: string;
  description?: string;
}

export class TasksRepository {
  private _repository =
    DatabaseConnection.connection.getRepository(TasksEntity);

  public async list() {
    const result = await this._repository.find({
      relations: {
        user: true,
      },
    });

    const tasks = result.map((item) => {
      return this.mapEntityToModel(item);
    });

    return tasks;
  }

  public async getById(id: string) {
    const result = await this._repository.findOneBy({
      id,
    });

    if (!result) {
      return null;
    }

    return this.mapEntityToModel(result);
  }

  public async create(task: TasksModel) {
    const userRepository = new UserRepository();
    const user = await userRepository.get(task.user.id);

    if (!user) {
      throw new Error("User is not found!");
    }

    const taskEntity = this._repository.create({
      id: task.id,
      title: task.title,
      description: task.description,
      user: user,
    });

    await this._repository.save(taskEntity);

    return this.mapEntityToModel(taskEntity);
  }

  public async update(task: UpdateTasksDTO) {
    const result = await this._repository.update(
      {
        id: task.id,
      },
      {
        title: task.title,
        description: task.description,
      }
    );

    return result.affected ?? 0;
  }

  public async delete(id: string) {
    return await this._repository.delete({
      id,
    });
  }

  private mapEntityToModel(taskEntity: TasksEntity) {
    const user = UserModel.create(
      taskEntity.user.name,
      taskEntity.user.email,
      taskEntity.user.password,
      taskEntity.user.id
    );

    return TasksModel.create(
      taskEntity.id,
      taskEntity.title,
      taskEntity.description,
      user
    );
  }
}
