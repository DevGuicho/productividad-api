const express = require('express');
const ProductServices = require('../services/products');

const productsApi = (app) => {
  const router = express.Router();
  const productsServices = new ProductServices();

  app.use('/api/products', router);

  router.get('/', async (req, res, next) => {
    const { tags } = req.query;
    try {
      const products = await productsServices.getProducts({ tags });
      res.status(200).json({
        data: products,
        message: 'Products listed',
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = productsApi;
