/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class User extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', 'UserHook.hashPassword');
  }

  tokens() {
    return this.hasMany('App/Models/Token');
  }

  roles() {
    return this.belongsToMany('App/Models/Role')
      .pivotTable('user_roles')
      .withTimestamps();
  }
}

module.exports = User;
