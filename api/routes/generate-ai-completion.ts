import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from '../config/prisma';
import { z } from 'zod';
import { model } from "../config/gemini";

const bodySchema = z.object({
    videoId: z.string().uuid(),
    template: z.string(),
    temperature: z.number().min(0).max(1).default(0.5),
});

type GenerateCompletionsRequest = FastifyRequest<{
    Body: {
        videoId: string;
        template: string;
        temperature?: number;
    };
}>;

export async function generateCompletionsRoute(app: FastifyInstance) {
    app.post('/ia/complete', async (req: GenerateCompletionsRequest, reply: FastifyReply) => {
        try {
            const { videoId, template, temperature } = bodySchema.parse(req.body);

            const video = await prisma.video.findUniqueOrThrow({
                where: { id: videoId }
            });

            if (!video.transcription) {
                return reply.status(400).send({ message: 'A transcrição do vídeo não foi encontrada' });
            }
            const promptMessage = template.replace('{transcription}', video.transcription);

            if (typeof promptMessage !== 'string' || promptMessage.trim() === '') {
                return reply.status(400).send({ message: 'A mensagem de prompt é inválida' });
            }
            const result = await model.generateContent(promptMessage, temperature);
            if (result?.response?.text) {
                try {
                    let generatedText = result.response.text();
                    generatedText = generatedText.replace(/\n/g, ' ');
                    generatedText = generatedText.replace(/\*/g, '');
                    const formattedResponse = JSON.stringify({ text: generatedText }, null, 1);
                    return reply.send(formattedResponse);
                } catch (error) {
                    console.error('Erro ao invocar a função de texto:', error);
                    return reply.status(500).send({ message: 'Erro ao processar o texto gerado' });
                }
            } else {
                return reply.status(500).send({ message: 'Resposta inválida do modelo' });
            }
        } catch (error) {
            console.error('Erro ao processar solicitação:', error.message);
            console.error('Error stack:', error.stack);
            return reply.status(500).send({ message: 'Erro do Servidor Interno' });
        }
    });
}