const MongoLib = require('../lib/mongo');

class ProductServices {
  constructor() {
    this.collection = 'products';
    this.mongoDB = new MongoLib();
  }
  async getProducts({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const products = await this.mongoDB.getAll(this.collection, query);
    return products || [];
  }
  async getProduct({ productId }) {
    const product = await this.mongoDB.get(this.collection, productId);
    return product || {};
  }
  async createProduct({ product }) {
    const createdMovieId = await this.mongoDB.create(this.collection, product);
    return createdMovieId;
  }
  async updateProduct({ productId, product } = {}) {
    const updatedMovieId = await this.mongoDB.update(
      this.collection,
      productId,
      product
    );
    return updatedMovieId;
  }
  async deleteProduct({ productId }) {
    const deletedMovieId = await this.mongoDB.delete(
      this.collection,
      productId
    );
    return deletedMovieId;
  }
}

module.exports = ProductServices;
