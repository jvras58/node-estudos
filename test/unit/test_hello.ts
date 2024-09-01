import tap from 'tap';
import { buildFastify } from '../../api/server';

//FIXME: error timeout 

tap.test('GET `/` route', async t => {
    t.plan(2);

    const fastify = await buildFastify();

    t.teardown(async () => {
        await fastify.close();
        
    });

    const response = await fastify.inject({
        method: 'GET',
        url: '/'
    });

    t.equal(response.statusCode, 200, 'returns a status code of 200');
    t.same(response.json(), { message: 'welcome to API' }, 'returns the welcome message');
});

