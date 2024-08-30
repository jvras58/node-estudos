import { FastifyInstance } from "fastify";
import { prisma } from '../config/prisma';
import { z } from 'zod';



const bodySchema = z.object({
    videoId: z.string().uuid(),
    template: z.string(),
    temperature: z.number().min(0).max(1).default(0.5),
});

export async function generateCompletionsRoute(app: FastifyInstance) {
    app.post('/ia/complete', async (req, reply) => {

        const { videoId,template, temperature } = bodySchema.parse(req.body);

        return{
            videoId,
            template,
            temperature
        }



    });
}