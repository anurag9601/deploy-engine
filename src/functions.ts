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
                return rej(err);
            }

            if (!stream) {
                return rej(new Error("Docker returned a null stream."));
            }

            docker.modem.followProgress(
                stream,
                (doneErr) => {
                    if (doneErr) {
                        return rej(doneErr);
                    }

                    return res({
                        success: true,
                        message: `${imageToPull} image successfully pulled.`,
                    });
                },
                (event) => {
                    if (event.status) {
                        console.log(
                            `[Pull ${imageToPull}] ${event.status} ${event.progress || ""}`
                        );
                    }
                }
            );
        });
    });
};