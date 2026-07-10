"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pullDockerImg = pullDockerImg;
const server_1 = require("./server");
;
function pullDockerImg(img, tag) {
    return new Promise((res, rej) => {
        const imageToPull = `${img}:${tag}`;
        server_1.docker.pull(imageToPull, {}, (err, stream) => {
            if (err) {
                return rej(err);
            }
            if (!stream) {
                return rej(new Error("Docker returned a null stream."));
            }
            server_1.docker.modem.followProgress(stream, (doneErr) => {
                if (doneErr) {
                    return rej(doneErr);
                }
                return res({
                    success: true,
                    message: `${imageToPull} image successfully pulled.`,
                });
            }, (event) => {
                if (event.status) {
                    console.log(`[Pull ${imageToPull}] ${event.status} ${event.progress || ""}`);
                }
            });
        });
    });
}
;
