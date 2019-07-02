const State = require('../models/stateModel');

class StateController {
  async store(req, res) {
    const state = await State.create(req.body);
    return res.json(state);
  }
}

module.exports = new StateController();