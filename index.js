const express = require('express');
const app = express();

const { config } = require('./config/index');
const productsApi = require('./routes/products');

const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middlewares/errorHandlers');

const notFoundHandler = require('./utils/middlewares/notFoundHandler');

// body parser
app.use(express.json());

// routes
productsApi(app);

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
