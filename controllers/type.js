const ApiError = require("../error/ApiError");
const { Type } = require("../models/models");

class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    res.json({ message: "type created", type });
  }
  async getAll(req, res) {
    const types = await Type.findAll();
    res.json(types);
  }
}

module.exports = new TypeController();
