import { docker } from "./server";

interface pullDockerImgReturnI {
    success: boolean;
    message?: string;
    error?: string;
};

export function pullDockerImg(img: string, tag: string): Promise<pullDockerImgReturnI> {
    return new Promise<pullDockerImgReturnI>((res, rej) => {
        const imageToPull = `${img}:${tag}`;
        docker.pull(imageToPull, {}, (err, stream) => {
            if (err) {
                rej(err);
            };

            docker.modem.followProgress(stream as any, (doneErr, output) => {
                if (doneErr) {
                    rej({ success: false, error: doneErr });
                };

                return res({ success: true, message: `${img}:${tag} image successfully pulled.` });
            }, (event) => {
                if (event.status) {
                    console.log(`[Pull ${img}:${tag}] ${event.status}:${event.process ? event.process : ""}`)
                }
            })
        })
    });
};