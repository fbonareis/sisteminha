/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class UserController {
  async index() {
    const users = await User.query()
      .setHidden(['password'])
      .with('roles')
      .fetch();

    return { users };
  }

  async store({ request, response }) {
    const data = request.only(['username', 'email', 'password']);

    const userExists = await User.findBy('email', data.email);

    if (userExists) {
      return response.status(400).send({ error: 'user already registered' });
    }

    const user = await User.create({ ...data });

    return response.created(user);
  }

  async destroy({ params, response }) {
    const user = await User.find(params.id);

    if (!user) {
      return response.status(404).send({ error: 'user not found' });
    }

    await user.delete();
  }

  async update({ params, request, response, auth }) {
    const data = request.only(['username', 'email', 'password']);

    if (auth.user.id !== Number(params.id)) {
      return response.status(401).send({ error: 'unauthorized' });
    }

    const user = await User.findOrFail(params.id);

    user.merge(data);

    await user.save();

    return user;
  }
}

module.exports = UserController;
