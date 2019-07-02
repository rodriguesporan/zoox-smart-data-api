const { Router } = require('express');
const CityController = require('./app/controllers/CityController');
const StateController = require('./app/controllers/StateController');

const routes = new Router();

routes.post('/states', StateController.store);
routes.get('/states', StateController.index);
routes.put('/states/:id', StateController.update);
routes.delete('/states/:id', StateController.delete);

routes.post('/cities', CityController.store);
routes.get('/cities', CityController.index);

module.exports = routes;
