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
}

module.exports = UserController;
