const { test, trait } = use('Test/Suite')('Session');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should return JWT token when session created', async ({
  assert,
  client,
}) => {
  const sessionPayload = {
    email: 'guedes@acme.com',
    password: '123456',
  };

  await Factory.model('App/Models/User').create(sessionPayload);

  const response = await client
    .post('/sessions')
    .send(sessionPayload)
    .end();

  response.assertStatus(200);
  assert.exists(response.body.token);
});

test('it should return status and message error when auth failed', async ({
  assert,
  client,
}) => {
  const sessionPayload = {
    email: '',
    password: '123456',
  };

  await Factory.model('App/Models/User').create(sessionPayload);

  const response = await client
    .post('/sessions')
    .send(sessionPayload)
    .end();

  response.assertStatus(200).assertJSONSubset({
    status: 'error',
    message: 'Invalid email/password',
  });
});
