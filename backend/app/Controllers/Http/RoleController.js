/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Role = use('App/Models/Role');
const User = use('App/Models/User');

class RoleController {
  async store({ request, response }) {
    const { name } = request.only(['name']);
    const role = await Role.create({ name });

    return response.created(role);
  }

  async assign({ request, params, response }) {
    const data = request.only(['role_id']);

    const user = await User.findBy('id', params.id);

    const userRoles = await user
      .roles()
      .wherePivot('role_id', data.role_id)
      .fetch();

    if (userRoles.rows.length > 0) {
      return response.status(404).send({ error: 'role exists for this user' });
    }

    await user.roles().attach([data.role_id]);

    return response.status(201).send();
  }
}

module.exports = RoleController;
