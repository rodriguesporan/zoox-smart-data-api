const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

class SessionController {
  async store(req, res) {
    const token = jwt.sign({}, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.json({ token });
  }
}

module.exports = new SessionController();
