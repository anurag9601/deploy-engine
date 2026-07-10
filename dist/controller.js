"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheckController = healthCheckController;
exports.createAndRunContainerController = createAndRunContainerController;
const server_1 = require("./server");
const functions_1 = require("./functions");
function healthCheckController(req, res) {
    try {
        return res.json({ success: true, message: "Managment server is running successfully!" }).status(200);
    }
    catch (error) {
        return res.json({ success: false, error: error }).status(500);
    }
}
function createAndRunContainerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { img, tag } = req.body;
            let isImageAvailable = false;
            const dockerImages = yield server_1.docker.listImages();
            for (let image of dockerImages) {
                for (let tag of image.RepoTags) {
                    if (tag === `${img}:${tag}`) {
                        isImageAvailable = true;
                        return;
                    }
                    ;
                }
                ;
            }
            ;
            if (!isImageAvailable) {
                const status = yield (0, functions_1.pullDockerImg)(img, tag);
                if (status.success === false) {
                    return res.json({ success: false, error: status.error }).status(500);
                }
            }
            const container = yield server_1.docker.createContainer({
                Image: `${img}:${tag}`,
                HostConfig: {
                    AutoRemove: true
                }
            });
            yield container.start();
            const inspect = yield container.inspect();
            return res.json({
                success: true,
                container: {
                    name: inspect.Name,
                    host: `${inspect.Name}.${server_1.HOST}`
                }
            }).status(200);
        }
        catch (error) {
            return res.json({ success: false, error: error }).status(500);
        }
    });
}
