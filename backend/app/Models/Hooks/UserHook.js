const Hash = use('Hash');

class UserHook {
  async hashPassword(user) {
    user.password = await Hash.make(user.password);
  }
}

module.exports = UserHook;
