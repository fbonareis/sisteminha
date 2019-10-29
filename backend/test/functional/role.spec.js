const { test, trait } = use('Test/Suite')('User Role');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Role = use('App/Models/Role');

const User = use('App/Models/User');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('it should create a new role', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('/roles')
    .loginVia(user, 'jwt')
    .send({
      name: 'admin',
    })
    .end();

  response.assertStatus(201);
  response.assertJSONSubset({
    name: 'admin',
  });
});

test('it should add role to user', async ({ client, assert }) => {
  const rolePayload = {
    name: 'Admin',
  };

  const user = await Factory.model('App/Models/User').create();
  const role = await Factory.model('App/Models/Role').create(rolePayload);

  const response = await client
    .post(`/users/${user.id}/role`)
    .loginVia(user, 'jwt')
    .send({
      role_id: role.id,
    })
    .end();

  response.assertStatus(201);

  const userRoles = await user.roles().fetch();

  assert.equal(userRoles.rows[0].name, rolePayload.name);
});
