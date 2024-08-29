import { FastifyServerOptions } from 'fastify';

export async function configServerOption(): Promise<FastifyServerOptions> {

    const isProduction: boolean = process.env.NODE_ENV === 'production';

    // documentação: https://fastify.dev/docs/latest/Reference/Logging/#enable-logging

    const serverOptions: FastifyServerOptions = {
        logger: isProduction
            ? true
            : {
                transport: {
                    target: 'pino-pretty',
                    options: {
                        colorize: true,
                        translateTime: 'HH:MM:ss.l',
                        ignore: 'pid,hostname', 
                    },
                },
            }
    };
    return serverOptions;
}