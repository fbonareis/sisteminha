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
  const user = await Factory.model('App/Models/User').create();

<<<<<<< HEAD
  const payload = {
    username: 'Guedes',
    email: 'guedes@acme.com',
    password: '123456',
  };

  const response = await client
    .post('/users')
    .send(payload)
    .loginVia(user, 'jwt')
=======
  const response = await client
    .post('/users')
    .loginVia(user, 'jwt')
    .send({
      username: 'Guedes',
      email: 'guedes@acme.com',
      password: '123456',
    })
>>>>>>> 78a9a6bded3805a171c06c7d90495410e7e45ef6
    .end();

  const { username, email, password } = payload;

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
