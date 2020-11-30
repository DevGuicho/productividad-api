const express = require('express');
const ProductServices = require('../services/products');
const validationHandler = require('../utils/middlewares/validationHandler');
const {
  updateProductSchema,
  createProductSchema,
  productIdSchema,
} = require('../utils/schemas/products');

const productsApi = (app) => {
  const router = express.Router();
  const productsServices = new ProductServices();

  app.use('/products', router);

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

  router.post(
    '/',
    validationHandler(createProductSchema),
    async function (req, res, next) {
      const product = req.body;
      try {
        const createdProductId = await productsServices.createProduct({
          product,
        });

        res.status(201).json({
          data: createdProductId,
          message: 'product created',
        });
      } catch (err) {
        next(err);
      }
    }
  );
  router.put(
    '/:productId',
    validationHandler({ productId: productIdSchema }, 'params'),
    validationHandler(updateProductSchema),
    async function (req, res, next) {
      const { productId } = req.params;
      const product = req.body;

      try {
        const updatedMovieId = await productsServices.updateProduct({
          productId,
          product,
        });

        res.status(200).json({
          data: updatedMovieId,
          message: 'movie updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );
  router.delete(
    '/:productId',
    validationHandler({ productId: productIdSchema }, 'params'),
    async function (req, res, next) {
      const { productId } = req.params;

      try {
        const deletedProductId = await productsServices.deleteProduct({
          productId,
        });

        res.status(200).json({
          data: deletedProductId,
          message: 'product deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
};

module.exports = productsApi;
