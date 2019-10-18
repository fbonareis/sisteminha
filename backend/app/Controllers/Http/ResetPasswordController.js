'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Token = use('App/Models/Token');

class ResetPasswordController {
  async store({ request }) {
    try {
      const { token, password } = request.only(['token', 'password']);

      const userToken = await Token.findByOrFail('token', token);

      const user = await userToken.user().fetch();

      user.password = password;

      await user.save();
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ResetPasswordController;
