const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(morgan('dev'));
    this.server.use(cors());
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
