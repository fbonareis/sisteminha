const { test, trait } = use('Test/Suite')('User');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

/**
 * @TODO
 * check if user has permission to create/delete users
 */

test('it should create a new user', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('/users')
    .loginVia(user, 'jwt')
    .send({
      username: 'Guedes',
      email: 'guedes@acme.com',
      password: '123456',
    })
    .end();

  response.assertStatus(201);
  response.assertJSONSubset({
    username: 'Guedes',
    email: 'guedes@acme.com',
  });

  const Hash = use('Hash');
  const checkPasswordHash = await Hash.verify('123456', response.body.password);

  assert.isTrue(checkPasswordHash);
});

test('it should delete a user', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .delete(`/users/${user.id}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(204);

  const userExists = await User.find(user.id);

  assert.isNull(userExists);
});

test('it should an error when user doesnt exists', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .delete('/users/123')
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(404);
  response.assertJSONSubset({ error: 'user not found' });
});

test('it should get users list', async ({ client, assert }) => {
  const users = await Factory.model('App/Models/User').createMany(10);

  const response = await client
    .get('/users')
    .loginVia(users[0], 'jwt')
    .end();

  assert.equal(response.body.users.length, users.length);
});

test('it should update a user', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const payloadUserUpdate = {
    username: 'Ex Guedes',
    email: 'exguedes@acme.com',
    password: '654321',
  };

  const response = await client
    .put(`/users/${user.id}`)
    .loginVia(user, 'jwt')
    .send(payloadUserUpdate)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    username: 'Ex Guedes',
    email: 'exguedes@acme.com',
  });

  const Hash = use('Hash');
  const checkPasswordHash = await Hash.verify('654321', response.body.password);

  assert.isTrue(checkPasswordHash);
});
