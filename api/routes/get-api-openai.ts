import { FastifyInstance } from "fastify";
import { openai } from "../config/openai";



export async function getApiOpenaiRoute(app: FastifyInstance) {
    app.get('/check-connection', async (_request, reply) => {
        try {
            const response = await openai.models.list();
            const models = response.data;
            reply.send({ success: true, message: 'Conexão com a API do OpenAI foi bem-sucedida.', models: models });
        } catch (error) {
            reply.status(500).send({ success: false, message: 'Falha ao conectar-se à API do OpenAI.', error: error.message });
        }
    });
}