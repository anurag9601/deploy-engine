import { Router } from "express";
import { createAndRunContainerController, healthCheckController } from "./controller";

const appRouter = Router();

appRouter.get("/", healthCheckController);

appRouter.post("/container", createAndRunContainerController);

export default appRouter;