const { Device } = require("../models/models");

class DeviceController {
  async create(req, res) {
    const { name, price, brandId, typeId, info } = req.body;
    const device = await Device.create({ name });
    res.json({ message: "type created", device });
  }
  async getAll(req, res) {
    const types = await Device.findAll();
    res.json(types);
  }
  getOne(req, res) {}
}

module.exports = new DeviceController();
