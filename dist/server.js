"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.HOST = exports.docker = void 0;
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const dockerode_1 = __importDefault(require("dockerode"));
exports.docker = new dockerode_1.default({
    socketPath: "/var/run/docker.sock"
});
const MANAGEMENT_APP = (0, express_1.default)();
MANAGEMENT_APP.use(express_1.default.json());
MANAGEMENT_APP.use("/", router_1.default);
exports.HOST = process.env.HOST || "localhost";
exports.PORT = process.env.PORT || 8080;
MANAGEMENT_APP.listen(exports.PORT, () => {
    console.log(`Management server is running on port ${exports.PORT}`);
});
