const { test, trait } = use('Test/Suite')('User');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('it should create a new user', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('/users')
    .loginVia(user, 'jwt')
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
