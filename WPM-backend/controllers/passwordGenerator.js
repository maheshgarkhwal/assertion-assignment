const model = require("../models");

module.exports = {
  generate: (req, res) => {
    try {
      let length = 16;
      let result = "";
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?";
      for (var i = 0, n = charset.length; i < length; ++i) {
        result += charset.charAt(Math.floor(Math.random() * n));
      }
      res.status(200).json({
        status: true,
        message: "Password created sucessfully",
        data: result,
      });
    } catch {
      res.status(500).json({ status: false, message: "internal server error" });
    }
  },

  create: (req, res) => {
    const { website, password } = req.body;
    model.Password.create({
      website,
      password,
    }).then(function (result) {
      if (result) {
        res.status(200).json({
          status: true,
          message: "Pasword saved saved succesfully",
          data: result,
        });
      } else {
        res
          .status(500)
          .json({ status: false, message: "Internal server error" });
      }
    });
  },
  findAll: (req, res) => {
    model.Password.findAll({}).then((result) => {
      res
        .status(200)
        .json({
          status: true,
          message: "Data retrived sucessfully",
          data: result,
        })
        .catch(() => {
          res
            .status(500)
            .json({ status: false, message: "internal server error" });
        });
    });
  },
  deleteById: (req, res) => {
    try {
      const { id } = req.body;
      model.Password.destroy({
        where: {
          id: id,
        },
      });
      res
        .status(200)
        .json({ status: true, messsage: "Record deleted sucessfully" });
    } catch (err) {
      res
        .status(500)
        .json({ status: false, message: "Internal server error", error: err });
    }
  },
};
