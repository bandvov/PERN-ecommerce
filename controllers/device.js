const { Device, DeviceInfo } = require("../models/models");
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
      if (info) {
        const info = JSON.parse(info);
        info.forEach((i) => {
          DeviceInfo.create({
            title,
            description,
            deviceId: device.id,
          });
        });
      }
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
      devices = await Device.findAndCountAll({ limit, offset });
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
  async getOne(req, res, next) {
    const id = req.params.id;
    try {
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: "info" }],
      });
      res.json({ device });
    } catch (error) {
      next(ApiError.notFound(error.message));
    }
  }
}

module.exports = new DeviceController();
