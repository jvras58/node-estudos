import { FastifyInstance } from "fastify";
import { model } from "../config/gemini";

export async function getApiGemaniTestRoute(app: FastifyInstance) {
    app.get('/ping', async (_request, reply) => {
        try {
            const prompt = "Responda com Pong";
            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = await response.text();

            reply.status(200).send({ status: "A conexão está funcionando", message: text });
        } catch (error) {
            reply.status(500).send({ status: "Falha na conexão", error: error.message });
        }
    });
}