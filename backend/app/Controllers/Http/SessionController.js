class SessionController {
  async store({ request, response, auth }) {
    const { email, password } = request.only(['email', 'password']);

    try {
      const token = await auth.attempt(email, password);

      return { token };
    } catch (error) {
      response.status(200).json({
        status: 'error',
        message: 'Invalid email/password',
      });
    }
  }
}

module.exports = SessionController;
