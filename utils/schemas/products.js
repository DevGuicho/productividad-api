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

const congressProductSchema = joi.string().max(80);
const dateProductSchema = joi.date();

const bookTitleSchema = joi.string().max(80);
const bookEditorialSchema = joi.string().max(80);
const bookEditionSchema = joi.string().max(80);
const bookDateSchema = joi.string().max(5);
const bookIsbnSchema = joi
  .string()
  .regex(
    /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/
  );

const developDetailsSchema = joi.string().max(1000);
const developLicenceSchema = joi.string().max(80);
const developDateSchema = joi.string().max(80);

const MagazineSchema = {
  nombre: magazineProductSchema.required(),
  tipo: magazineTypeSchema.required(),
  indice: magazineIndexSchema.required(),
  isnn: magazineIsnnSchema.required(),
  doi: magazineDoiSchema.required(),
};
const CongressSchema = {
  nombre: congressProductSchema,
  fecha: dateProductSchema,
};
const BookSchema = {
  titulo: bookTitleSchema,
  editorial: bookEditorialSchema,
  edicion: bookEditionSchema,
  fecha: bookDateSchema,
  isbn: bookIsbnSchema,
};
const DevelopSchema = {
  detalles: developDetailsSchema,
  licencia: developLicenceSchema,
  fecha: developDateSchema,
};
const createProductSchema = {
  id: productIdSchema.required(),
  titulo: productTitleSchema.required(),
  autor: productAutorSchema.required(),
  url: productUrlSchema.required(),
  tesis: productTesisSchema.required(),
  type: productTypeSchema.required(),
  revista: MagazineSchema,
  congreso: CongressSchema,
  libro: BookSchema,
  desarrollo: DevelopSchema,
};
const updateProductSchema = {
  id: productIdSchema,
  titulo: productTitleSchema,
  autor: productAutorSchema,
  url: productUrlSchema,
  tesis: productTesisSchema,
  type: productTypeSchema,
  revista: MagazineSchema,
  congreso: CongressSchema,
  libro: BookSchema,
  desarrollo: DevelopSchema,
};

module.exports = {
  productIdSchema,
  createProductSchema,
  updateProductSchema,
};
