const State = require('../models/stateModel');

class StateController {
  async store(req, res) {
    try {
      const state = await State.create(req.body);
      return res.json(state);
    } catch ({ errmsg: error }) {
      return res.status(400).json({ error });
    }
  }

  async index(req, res) {
    const states = await State.find({}).sort('createdAt');
    return res.json(states);
  }
}

module.exports = new StateController();
