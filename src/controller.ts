import { Request, Response } from "express";
import { docker, HOST } from "./server";
import { pullDockerImg } from "./functions";


export function healthCheckController(req: Request, res: Response) {
    try {
        return res.json({ success: true, message: "Managment server is running successfully!" }).status(200);
    } catch (error) {
        return res.json({ success: false, error: error }).status(500);
    }
}

export async function createAndRunContainerController(req: Request, res: Response) {
    try {
        const { img, tag } = req.body;

        let isImageAvailable = false;

        const dockerImages = await docker.listImages();

        for (let image of dockerImages) {
            for (let tag of image.RepoTags as string[]) {
                if (tag === `${img}:${tag}`) {
                    isImageAvailable = true;
                    return;
                };
            };
        };

        if (!isImageAvailable) {
            const status = await pullDockerImg(img, tag);

            if (status.success === false) {
                return res.json({ success: false, error: status.error }).status(500);
            }
        }

        const container = await docker.createContainer({
            Image: `${img}:${tag}`,
            HostConfig: {
                AutoRemove: true
            }
        });

        await container.start();

        const inspect = await container.inspect();

        return res.json({
            success: true,
            container: {
                name: inspect.Name,
                host: `${inspect.Name}.${HOST}`
            }
        }).status(200);

    } catch (error) {
        return res.json({ success: false, error: error }).status(500);
    }
}