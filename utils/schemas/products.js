const joi = require('@hapi/joi');

const productIdSchema = joi.string().regex(/^[0-9a-fA-F]{32}$/);
const productTitleSchema = joi.string().max(80);
const productAutorSchema = joi.string().max(80);
const productUrlSchema = joi.string().uri();
const productTesisSchema = joi.string().max(30);
const productTypeSchema = joi.string().max(20);

const magazineProductSchema = joi.string().max(80);
const magazineTypeSchema = joi.string().max(15);
const magazineIndexSchema = joi.string().max(40);
const magazineIsnnSchema = joi.string().regex(/^(ISSN )?[\S]{4}\-[\S]{4}$/);
const magazineDoiSchema = joi
  .string()
  .regex(/^.*(10\.[A-Za-z0-9.\/-]+)(?<!\.)(?=[ ]|\.).*$/);

const MagazineSchema = {
  nombre: magazineProductSchema.required(),
  tipo: magazineTypeSchema.required(),
  indice: magazineIndexSchema.required(),
  isnn: magazineIsnnSchema.required(),
  doi: magazineDoiSchema.required(),
};

const createProductSchema = {
  id: productIdSchema.required(),
  titulo: productTitleSchema.required(),
  autor: productAutorSchema.required(),
  url: productUrlSchema.required(),
  tesis: productTesisSchema.required(),
  type: productTypeSchema.required(),
  revista: MagazineSchema,
};
const updateProductSchema = {
  id: productIdSchema,
  titulo: productTitleSchema,
  autor: productAutorSchema,
  url: productUrlSchema,
  tesis: productTesisSchema,
  type: productTypeSchema,
  revista: MagazineSchema,
};

module.exports = {
  productIdSchema,
  createProductSchema,
  updateProductSchema,
};
