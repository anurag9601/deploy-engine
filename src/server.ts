import express from "express";
import appRouter from "./router";
import Docker from "dockerode";

export const docker = new Docker({
    socketPath: "//./pipe/docker_engine"
});

const MANAGEMENT_APP = express();

MANAGEMENT_APP.use(express.json());
MANAGEMENT_APP.use("/", appRouter);

export const HOST = process.env.HOST || "localhost";
export const PORT = process.env.PORT || 8080;

MANAGEMENT_APP.listen(PORT, () => {
    console.log(`Management server is running on port ${PORT}`);
});