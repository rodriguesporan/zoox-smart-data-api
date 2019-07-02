const { Router } = require('express');
const path = require('path');
const CityController = require('./app/controllers/CityController');
const StateController = require('./app/controllers/StateController');
const SessionController = require('./app/controllers/SessionController');
const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();

routes.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'files', 'index.html'));
});
routes.get('/postman', (req, res) => {
  res.download(path.join(__dirname, 'files', 'postman_collection.json'));
});

routes.post('/sessions', SessionController.store);
routes.get('/states', StateController.index);
routes.get('/cities', CityController.index);

routes.use(authMiddleware);
routes.post('/states', StateController.store);
routes.put('/states/:id', StateController.update);
routes.delete('/states/:id', StateController.delete);

routes.post('/cities', CityController.store);
routes.put('/cities/:id', CityController.update);
routes.delete('/cities/:id', CityController.delete);

module.exports = routes;
