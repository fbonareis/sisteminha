
/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Role = use('App/Models/Role');

const Database = use('Database');

async function truncateTables() {
  await User.truncate();
  await Role.truncate();
  await Database.table('user_roles').truncate();
}

class UserSeeder {
  async run() {
    await truncateTables();

    const role = await Factory.model('App/Models/Role').make({
      name: 'admin',
    });

    const userAdmin = await Factory.model('App/Models/User').create({
      username: 'fbonareis',
      email: 'fbonareis@gmail.com',
      password: '123456',
    });

    await userAdmin.roles().save(role);

    await Factory.model('App/Models/User').createMany(5);
  }
}

module.exports = UserSeeder;
