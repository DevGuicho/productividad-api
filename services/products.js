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
  async getProduct({ movieId }) {
    const movie = await this.mongoDB.get(this.collection, movieId);
    return movie || {};
  }
  async createProduct({ movie }) {
    const createdMovieId = await this.mongoDB.create(this.collection, movie);
    return createdMovieId;
  }
  async updateProduct({ movieId, movie } = {}) {
    const updatedMovieId = await this.mongoDB.update(
      this.collection,
      movieId,
      movie
    );
    return updatedMovieId;
  }
  async deleteProduct({ movieId }) {
    const deletedMovieId = await this.mongoDB.delete(this.collection, movieId);
    return deletedMovieId;
  }
}

module.exports = ProductServices;
