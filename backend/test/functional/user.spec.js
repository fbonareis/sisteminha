const { test, trait } = use('Test/Suite')('User');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

const Hash = use('Hash');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('it should create a new user', async ({ assert, client }) => {
  const auth = await Factory.model('App/Models/User').create();
  const { username, email, password } = await Factory.model(
    'App/Models/User',
  ).make();

  const response = await client
    .post('/users')
    .send({ username, email, password })
    .loginVia(auth, 'jwt')
    .end();

  response.assertStatus(201).assertJSONSubset({ username, email });

  const checkPasswordHash = await Hash.verify(password, response.body.password);

  assert.isTrue(checkPasswordHash);
});

test('it should delete a user', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .delete(`/users/${user.id}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(204);

  const exists = await User.find(user.id);

  assert.isNull(exists);
});

test('it should an error when user doesnt exists', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .delete('/users/123')
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(404).assertJSONSubset({ error: 'user not found' });
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

  const payload = {
    username: 'Ex Guedes',
    email: 'exguedes@acme.com',
    password: '654321',
  };

  const response = await client
    .put(`/users/${user.id}`)
    .loginVia(user, 'jwt')
    .send(payload)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    username: 'Ex Guedes',
    email: 'exguedes@acme.com',
  });

  const checkPasswordHash = await Hash.verify(
    payload.password,
    response.body.password,
  );

  assert.isTrue(checkPasswordHash);
});
