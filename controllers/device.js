const { Device } = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError");
class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;

      const { img } = req.files;

      const filename = uuid.v4() + ".jpg";

      img.mv(path.resolve(__dirname, "..", "static", filename));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: filename,
      });
      res.json({ message: "type created", device });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async getAll(req, res) {
    const { brandId, typeId, page = 1, limit = 9 } = req.query;
    const offset = (page - 1) * limit;
    let devices;

    if (!brandId && !typeId) {
      devices = await Device.findAll({ limit, offset });
    } else if (brandId && !typeId) {
      devices = await Device.findAll({ where: { brandId }, limit, offset });
    } else if (!brandId && typeId) {
      devices = await Device.findAll({ where: { typeId }, limit, offset });
    } else if (brandId && typeId) {
      devices = await Device.findAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }
    res.json(devices);
  }
  async getOne(req, res) {}
}

module.exports = new DeviceController();
