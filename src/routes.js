const { Router } = require('express');
const StateController = require('./app/controllers/StateController');

const routes = new Router();

routes.post('/states', StateController.store);
routes.get('/states', StateController.index);
routes.put('/states/:id', StateController.update);

module.exports = routes;
