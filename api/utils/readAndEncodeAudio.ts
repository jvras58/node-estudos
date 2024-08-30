import { promises as fs } from 'node:fs';
import { PathLike } from "fs";


export async function readAndEncodeAudio(videoPath: PathLike | fs.FileHandle) {
    const audioData = await fs.readFile(videoPath);
    return audioData.toString("base64");
}

