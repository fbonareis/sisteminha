const { test, trait } = use('Test/Suite')('User Role');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Role = use('App/Models/Role');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('it should create a new role', async ({ assert, client }) => {
  const response = await client
    .post('/roles')
    .send({
      name: 'admin',
    })
    .end();

  response.assertStatus(201);
  response.assertJSONSubset({
    name: 'admin',
  });
});
