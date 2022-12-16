import { v4 as createUuid } from "uuid";
import { UserModel } from "./user.model";

export class TasksModel {
  private _id: string;

  constructor(
    private _title: string,
    private _description: string,
    private _user: UserModel
  ) {
    this._id = createUuid();
  }

  public get title() {
    return this._title;
  }

  public set title(title: string) {
    this._title = title;
  }

  public get description() {
    return this._description;
  }

  public set description(description: string) {
    this._description = description;
  }

  public get id() {
    return this._id;
  }

  public get tasks(): string[] {
    return this.tasks ?? [];
  }

  public get user() {
    return this._user;
  }

  // Adapter
  public getTasks() {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      tasks: this.tasks,
      user: this.user,
    };
  }

  public static create(
    id: string,
    title: string,
    description: string,
    user: UserModel
  ) {
    const tasks = new TasksModel(title, description, user);
    tasks._id = id;

    return tasks;
  }
}
