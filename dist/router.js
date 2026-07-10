"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const appRouter = (0, express_1.Router)();
appRouter.get("/", controller_1.healthCheckController);
appRouter.post("/container", controller_1.createAndRunContainerController);
exports.default = appRouter;
