import { Request, Response, Router } from "express";
import { TasksController } from "../controllers/tasks.controller";

const tasksRoutes = Router({
  mergeParams: true,
});

//---------------TasksRoutes--------------

tasksRoutes.get("/", new TasksController().listTask);

tasksRoutes.post("/:userId", new TasksController().createTask);

/* tasksRoutes.put("/:userId/:taskId", (req: Request, res: Response) =>
  new TasksController().updateTask(req, res)
); */

tasksRoutes.delete("/:userId/:taskId", (req: Request, res: Response) =>
  new TasksController().deleteTask(req, res)
);

export { tasksRoutes };
