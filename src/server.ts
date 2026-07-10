import express from "express";
import appRouter from "./router";
import Docker from "dockerode";
import httpProxy from "http-proxy";

export const docker = new Docker({
    socketPath: "/var/run/docker.sock"
});

const MANAGEMENT_APP = express();
const PROXY_APP = express();

const PROXY = httpProxy.createProxy();

MANAGEMENT_APP.use(express.json());
MANAGEMENT_APP.use("/", appRouter);

export const HOST = process.env.HOST || "localhost";
export const PORT = process.env.PORT || 8080;

MANAGEMENT_APP.listen(PORT, () => {
    console.log(`Management server is running on port ${PORT}`);
});

PROXY_APP.use((req, res) => {
    const containerName = req.hostname.split(".")[0];
    return PROXY.web(req, res, {
        target: `http://${containerName}:80`
    });
});

PROXY_APP.listen(80, () => {
    console.log(`Proxy server is running on port 80`);
});