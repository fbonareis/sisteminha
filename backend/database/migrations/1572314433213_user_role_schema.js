/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserRoleSchema extends Schema {
  up() {
    this.create('user_roles', table => {
      table.increments();

      table
        .integer('user_id')
        .unsigned()
        .index('user_id');
      table
        .integer('role_id')
        .unsigned()
        .index('role_id');
      table
        .foreign('user_id')
        .references('user.id')
        .onDelete('CASCADE');
      table
        .foreign('role_id')
        .references('role.id')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('user_roles');
  }
}

module.exports = UserRoleSchema;
