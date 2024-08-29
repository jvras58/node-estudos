import Fastify, { FastifyInstance } from 'fastify';
import { configServerOption } from './config/serverconfig';
import { getAllPromptsRoute } from './routes/get-all-prompts';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3333;

const startServer = async () => {
    const serverOptions = await configServerOption();
    const app: FastifyInstance = Fastify(serverOptions);

    // ----------------------------------
    //   APP ROUTERS
    //  ----------------------------------

    app.register(getAllPromptsRoute);

    // ----------------------------------
    //   Start server
    //  ----------------------------------

    app.get('/', async (_request, _reply) => {
      return { message: 'welcome to API' };
    });

    try {
        await app.listen({ port });
        app.log.info(`Server running at http://localhost:${port}/`);
    } catch (err) {
        app.log.error('Error starting server:', err);
        process.exit(1);
    }
};

// ----------------------------------
//   Entry point
//  ----------------------------------

startServer();