import { FastifyInstance } from "fastify";
import { prisma } from '../config/prisma'
import {z} from 'zod';
import { createReadStream } from 'node:fs';
import { create } from "node:domain";
import { openai } from "../config/openai";

const paramsSchema = z.object({
    videoId: z.string().uuid()
});

const bodySchema = z.object({
    prompt: z.string()
});

// FIXME: ESTOU ENFRENTANDO ERRO CONEXÃO RECUSADA 500 (ECONNRESET) 
// PROVAVELMENTE NÃO ESTOU SABENDO PEGAR A CHAVE DA API DO OPENAI CORRETAMENTE...
export async function createTranscriptionRouter(app: FastifyInstance) {
    app.post('/videos/:videoId/transcription', async (req, reply) => {
        try {
            const { videoId } = paramsSchema.parse(req.params);
            const { prompt } = bodySchema.parse(req.body);
    
            const video = await prisma.video.findUniqueOrThrow({
                where: { id: videoId }
            });
    
            const videoPath = video.path;
            const audioReadStream = createReadStream(videoPath);
    
            const response = await openai.audio.transcriptions.create({
                file: audioReadStream,
                model: 'whisper-1',
                language: 'pt',
                response_format: 'json',
                temperature: 0,
                prompt,
            });
            console.log('Transcrição:', response.text);
    
            return { responseText: response.text };
        } catch (error) {
            console.error('Erro na transcrição:', error);
            return reply.status(500).send({
                message: 'Ocorreu um erro ao processar a transcrição.',
                error: error.message
            });
        }
    });
}    