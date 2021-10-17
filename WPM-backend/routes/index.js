const express = require("express");
const router = express.Router();
const {
  create,
  findAll,
  deleteById,
  generate,
} = require("../controllers/passwordGenerator.js");

router.get("/generate", generate);
router.post("/password", create);
router.get("/password", findAll);
router.delete("/password", deleteById);

module.exports = router;
