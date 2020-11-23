const express = require('express');
const app = express();
const productsApi = require('./routes/products');
const { config } = require('./config');

app.use(express.json());

productsApi(app);

app.listen(config.port, () => console.log(`Server on port ${config.port}`));
