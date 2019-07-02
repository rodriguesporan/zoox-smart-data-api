const yup = require('yup');
const City = require('../models/cityModel');
const State = require('../models/stateModel');

class CityController {
  /**
   * Cria uma nova cidade
   */
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

  /**
   * Lista todas as cidades
   */
  async index(req, res) {
    const cities = await City.find({})
      .populate({ path: 'state', select: ['name', 'uf'] })
      .sort('createdAt');
    return res.json(cities);
  }

  /**
   * Atualiza uma cidade
   */
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

  /**
   * Deleta uma cidade
   */
  async delete(req, res) {
    try {
      const city = await City.findByIdAndDelete(req.params.id);
      if (!city) {
        return res.status(400).json({ error: 'City not found.' });
      }
      const state = await State.findById(city.state);
      // eslint-disable-next-line no-underscore-dangle
      const cities = state.cities.filter(c => c._id !== req.params.id);
      state.cities = cities;
      await state.save();
      return res.json({});
    } catch (error) {
      return res.status(400).json({ error: 'Invalid Id.' });
    }
  }
}

module.exports = new CityController();
