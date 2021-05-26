const UserModel = require("../models/UserModel");

module.exports.search = async (req, res) => {
  try {
    const { searchText } = req.params;

    if (searchText.length === 0) return;

    const results = await UserModel.find({
      name: { $regex: searchText, $options: "i" },
    });

    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server`);
  }
};
