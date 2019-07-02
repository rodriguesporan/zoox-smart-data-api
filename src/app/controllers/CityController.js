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
    try {
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
    } catch (error) {
      return res.status(400).json({ error: 'Invalid state.' });
    }
  }

  async index(req, res) {
    const cities = await City.find({})
      .populate({ path: 'state', select: ['name', 'uf'] })
      .sort('createdAt');
    return res.json(cities);
  }

  async update(req, res) {
    const schema = yup.object().shape({
      name: yup.string(),
      state: yup.string(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }
    const { state: stateId } = req.body;
    try {
      const state = await State.findById(stateId);
      if (stateId && !state) {
        return res.status(400).json({ error: 'State does not exists.' });
      }
    } catch (error) {
      return res.status(400).json({ error: 'Invalid state.' });
    }
    try {
      const city = await City.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!city) {
        return res.status(400).json({ error: 'City not found.' });
      }
      return res.json(city);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid Id.' });
    }
  }
}

module.exports = new CityController();
