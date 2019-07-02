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
    const state = await State.findById(req.body.state);
    if (!state) {
      return res.status(400).json({ error: 'State does not exists.' });
    }
    try {
      const city = await City.create(req.body);
      state.cities.push(city);
      await state.save();
      return res.json(city);
    } catch ({ errmsg: error }) {
      return res.status(400).json({ error });
    }
  }

  async index(req, res) {
    const cities = await City.find({})
      .populate({ path: 'state', select: ['name', 'uf'] })
      .sort('createdAt');
    return res.json(cities);
  }
}

module.exports = new CityController();
