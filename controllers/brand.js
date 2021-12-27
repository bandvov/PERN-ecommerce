const { Brand } = require("../models/models");

class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    res.json({ message: "brand created", brand });
  }
  async getAll(req, res) {
    const brands = await Brand.findAll();
    res.json(brands);
  }
}

module.exports = new TypeController();
