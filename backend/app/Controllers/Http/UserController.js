'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class UserController {
  async store({ request }) {
    const { username, email, password } = request.only([
      'username',
      'email',
      'password'
    ]);

    const user = await User.create({ username, email, password });

    return user;
  }

  async destroy({ params, response }) {
    const { id } = params;

    const user = await User.find(id);

    await user.delete();
  }
}

module.exports = UserController;
