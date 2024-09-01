import Fastify, { FastifyInstance } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { configServerOption } from './config/serverconfig';
import { getAllPromptsRoute } from './routes/get-all-prompts';
import { uploadVideoRoute } from './routes/upload-video';
import { createTranscriptionRouter } from './routes/create-transcription';
import { getApiGemaniTestRoute } from './routes/get-api-gemini';
import { generateCompletionsRoute } from './routes/generate-ai-completion';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3333;

export const buildFastify = async (): Promise<FastifyInstance> => {
    const serverOptions = await configServerOption();
    const app: FastifyInstance = Fastify(serverOptions);

    // ----------------------------------
    //   Cors
    //  ----------------------------------
    app.register(fastifyCors, {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });

    // ----------------------------------
    //   APP ROUTERS
    //  ----------------------------------
    app.register(getAllPromptsRoute);
    app.register(uploadVideoRoute);
    app.register(getApiGemaniTestRoute);
    app.register(createTranscriptionRouter);
    app.register(generateCompletionsRoute);

    // ----------------------------------
    //   Default route
    //  ----------------------------------
    app.get('/', async (_request, _reply) => {
        return { message: 'welcome to API' };
    });

    return app;
};

// ----------------------------------
//   Entry point
//  ----------------------------------
const startServer = async () => {
    const app = await buildFastify();

    try {
        await app.listen({ port });
        app.log.info(`Server running at http://localhost:${port}/`);
    } catch (err) {
        app.log.error('Error starting server:', err);
        process.exit(1);
    }
};

startServer();