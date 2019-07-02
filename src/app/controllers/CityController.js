const yup = require('yup');
const City = require('../models/cityModel');
const State = require('../models/stateModel');

class CityController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      state: yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }
    const stateExists = await State.findById(req.body.state);
    if (!stateExists) {
      return res.status(400).json({ error: 'State does not exists.' });
    }
    try {
      const city = await City.create(req.body);
      return res.json(city);
    } catch ({ errmsg: error }) {
      return res.status(400).json({ error });
    }
  }
}

module.exports = new CityController();
