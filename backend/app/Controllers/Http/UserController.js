'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class UserController {
  async store({ request, response }) {
    const { username, email, password } = request.only([
      'username',
      'email',
      'password'
    ]);

    const user = await User.create({ username, email, password });

    return response.created(user);
  }

  async destroy({ params, response }) {
    const { id } = params;

    const user = await User.find(id);

    if (user === null) {
      return response.status(404).send({ error: 'user not found' });
    }

    await user.delete();
  }
}

module.exports = UserController;
