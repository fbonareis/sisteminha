const { randomBytes } = require('crypto');
const { promisify } = require('util');

const Mail = use('Mail');
const Env = use('Env');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class ForgotPasswordController {
  async store({ request }) {
    const email = request.input('email');

    const user = await User.findByOrFail({ email });

    const random = await promisify(randomBytes)(24);
    const token = random.toString('hex');

    await user.tokens().create({
      token,
      type: 'forgotpassword',
    });

    const resetPasswordUrl = `${Env.get('FRONT_URL')}/reset/?token=${token}`;

    await Mail.send(
      'emails.forgotpassword',
      { username: user.username, resetPasswordUrl },
      message => {
        message
          .to(user.email)
          .from('noreply@sisteminha.com')
          .subject('Sisteminha - Recuperação de senha');
      }
    );

    console.log('dasdasd');
  }
}

module.exports = ForgotPasswordController;
