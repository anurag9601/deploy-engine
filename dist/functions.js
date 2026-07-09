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
                rej(err);
            }
            ;
            server_1.docker.modem.followProgress(stream, (doneErr, output) => {
                if (doneErr) {
                    rej({ success: false, error: doneErr });
                }
                ;
                return res({ success: true, message: `${img}:${tag} image successfully pulled.` });
            }, (event) => {
                if (event.status) {
                    console.log(`[Pull ${img}:${tag}] ${event.status}:${event.process ? event.process : ""}`);
                }
            });
        });
    });
}
;
