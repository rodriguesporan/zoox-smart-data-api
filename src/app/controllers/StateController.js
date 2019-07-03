const yup = require('yup');
const State = require('../models/stateModel');
const City = require('../models/cityModel');
const { ObjectId } = require('mongoose').Types;

class StateController {
  /**
   * Cria um novo estado
   */
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      uf: yup
        .string()
        .required()
        .min(2)
        .max(2),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    try {
      const state = await State.create(req.body);
      return res.json(state);
    } catch ({ errmsg: error }) {
      return res.status(400).json({ error });
    }
  }

  /**
   * Cria lista todos os estados
   */
  async index(req, res) {
    const states = await State.find({})
      .populate({ path: 'cities', select: ['name'] })
      .sort('createdAt');
    return res.json(states);
  }

  /**
   * Atualiza um estado
   */
  async update(req, res) {
    const schema = yup.object().shape({
      name: yup.string(),
      uf: yup
        .string()
        .min(2)
        .max(2),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    try {
      const state = await State.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!state) {
        return res.status(400).json({ error: 'State not found.' });
      }
      return res.json(state);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid Id.' });
    }
  }

  /**
   * Deleta um estado
   */
  async delete(req, res) {
    try {
      const state = await State.findByIdAndDelete(req.params.id);
      if (!state) {
        return res.status(400).json({ error: 'State not found.' });
      }
      const cities = await City.find({ state: new ObjectId(req.params.id) });
      cities.forEach(async ({ _id: id }) => {
        await City.findByIdAndDelete(id);
      });
      return res.json({});
    } catch (error) {
      return res.status(400).json({ error: 'Invalid Id.' });
    }
  }
}

module.exports = new StateController();
