/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Role = use('App/Models/Role');
const User = use('App/Models/User');

class RoleController {
  async store({ request, response }) {
    const data = request.only(['name']);
    const role = await Role.create({ ...data });

    return response.created(role);
  }

  async assign({ request, params, response }) {
    const data = request.only(['role_id']);

    const user = await User.findBy('id', params.id);

    await user.roles().attach([data.role_id]);

    return response.status(201).send();
  }
}

module.exports = RoleController;
