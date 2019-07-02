const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

class SessionController {
  /**
   * Gera um novo token
   */
  async store(req, res) {
    const token = jwt.sign({}, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.json({ token });
  }
}

module.exports = new SessionController();
