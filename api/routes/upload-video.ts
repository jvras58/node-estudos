import { FastifyInstance } from "fastify";
import { prisma } from '../config/prisma'
import { fastifyMultipart } from "@fastify/multipart";
import fs from 'node:fs';
import { pipeline } from 'node:stream';
import path from "node:path";
import { promisify } from 'node:util';
import { randomUUID } from "node:crypto";


const pump = promisify(pipeline);


export async function uploadVideoRoute(app: FastifyInstance) {
    app.register(fastifyMultipart, { limits: { fileSize: 1000000 * 25 } });

    app.post('/videos', async (request, reply) => {
        const data = await request.file();

        if (!data) {
            return reply.code(400).send({ error: 'No file uploaded' });
        }

        const extension = path.extname(data.filename);

        if (extension !== '.mp3' && extension !== '.mp4') {
            return reply.code(400).send({ error: 'Invalid file type, please upload MP3/MP4' });
        }

        const fileBaseName = path.basename(data.filename, extension);
        const fileuploadName = `${fileBaseName}-${randomUUID()}${extension}`;
        const uploadDestination = path.join(__dirname, '../../tmp', fileuploadName);

        // Neste trecho, estamos usando o plugin fastify-multipart para lidar com uploads de arquivos: https://github.com/fastify/fastify-multipart
        await pump(data.file, fs.createWriteStream(uploadDestination))

        const video = await prisma.video.create({
            data: {
                nome: data.filename,
                path: uploadDestination
            }
        });

        return reply.code(201).send({ message: 'File uploaded', video });
    })
}

