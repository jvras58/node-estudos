import { FastifyInstance } from "fastify";
import { prisma } from '../config/prisma';
import { z } from 'zod';
import { model } from "../config/gemini";
import { readAndEncodeAudio } from "../utils/readAndEncodeAudio";
import { removeTimestamps } from "../utils/removeTimestamps";

const paramsSchema = z.object({
    videoId: z.string().uuid()
});

const bodySchema = z.object({
    prompt: z.string()
});

export async function createTranscriptionRouter(app: FastifyInstance) {
    app.post('/videos/:videoId/transcription', async (req, reply) => {
        try {
            const { videoId } = paramsSchema.parse(req.params);
            const { prompt } = bodySchema.parse(req.body);

            const video = await prisma.video.findUniqueOrThrow({
                where: { id: videoId }
            });

            const audioBase64 = await readAndEncodeAudio(video.path);

            const audioPart = {
                inlineData: {
                    data: audioBase64,
                    mimeType: "audio/mp3",
                },
            };

            const result = await model.generateContent([prompt, audioPart]);
            const rawText = result.response.text();

            const responseText = removeTimestamps(rawText);

            await prisma.video.update({
                where: { id: videoId },
                data: {
                    transcription: responseText
                }
            });

            return reply.status(201).send({
                message: 'Transcrição criada com sucesso!',
                transcription: responseText
            });
        } catch (error) {
            console.error('Erro na transcrição:', error);

            return reply.status(500).send({
                message: 'Ocorreu um erro ao processar a transcrição.',
                error: error.message || 'Erro desconhecido',
                stack: error.stack 
            });
        }
    });
}