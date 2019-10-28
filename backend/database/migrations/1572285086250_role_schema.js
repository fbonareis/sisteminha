/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RoleSchema extends Schema {
  up() {
    this.create('roles', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users');
      table
        .string('name', 40)
        .notNullable()
        .unique()
        .index();
      table.timestamps();
    });
  }

  down() {
    this.drop('roles');
  }
}

module.exports = RoleSchema;
