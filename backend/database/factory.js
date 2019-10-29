/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/User', (faker, index, data = {}) => ({
  username: faker.username(),
  email: faker.email(),
  password: faker.string(),
  ...data,
}));

Factory.blueprint('App/Models/Role', (faker, index, data = {}) => ({
  name: faker.string({ length: 40 }),
  ...data,
}));

Factory.blueprint('App/Models/Token', (faker, index, data = {}) => ({
  type: data.type || 'refreshtoken',
  token: faker.string({ length: 20 }),
  ...data,
}));
