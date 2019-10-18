const Mail = use('Mail');
const Hash = use('Hash');

const { test, trait } = use('Test/Suite')('Forgot Password');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should send an email with reset password instructions', async ({
  assert,
  client
}) => {
  Mail.fake();

  const email = 'guedes@acme.com';

  const user = await Factory.model('App/Models/User').create({ email });

  await client
    .post('/forgot')
    .send({ email })
    .end();

  const token = await user.tokens().first();

  const recentEmail = Mail.pullRecent();

  assert.equal(recentEmail.message.to[0].address, email);

  assert.include(token.toJSON(), {
    type: 'forgotpassword'
  });

  Mail.restore();
});

test('it should be able to reset password', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const userToken = await Factory.model('App/Models/Token').make();

  await user.tokens().save(userToken);

  const response = await client
    .post('/reset')
    .send({
      token: userToken.token,
      password: '123456',
      password_confirmation: '123456'
    })
    .end();

  response.assertStatus(204);

  await user.reload();

  const checkPassword = await Hash.verify('123456', user.password);

  assert.isTrue(checkPassword);
});
