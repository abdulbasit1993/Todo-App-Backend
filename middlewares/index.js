const mongoose = require("mongoose");

const validateID = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID",
    });
  }

  req.id = id;
  next();
};

module.exports = validateID;
