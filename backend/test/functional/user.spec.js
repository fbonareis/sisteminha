const { test, trait } = use('Test/Suite')('User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

trait('Test/ApiClient');

test('it should create a new user', async ({ assert, client, auth }) => {
  const Hash = use('Hash');

  const response = await client
    .post('/users')
    .send({
      username: 'Guedes',
      email: 'guedes@acme.com',
      password: '123456'
    })
    .end();

  response.assertJSONSubset({
    username: 'Guedes',
    email: 'guedes@acme.com'
  });

  const checkPasswordHash = await Hash.verify('123456', response.body.password);

  assert.isTrue(checkPasswordHash);
});
