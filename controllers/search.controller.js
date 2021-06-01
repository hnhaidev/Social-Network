const UserModel = require("../models/UserModel");

module.exports.search = async (req, res) => {
  try {
    const { searchText } = req.params;
    const { userId } = req;

    if (searchText.length === 0) return;

    const results = await UserModel.find({
      name: { $regex: searchText, $options: "i" },
    });

    const resultsToBeSent =
      results.length > 0 &&
      results.filter((result) => result._id.toString() !== userId);

    return res
      .status(200)
      .json(resultsToBeSent.length > 0 ? resultsToBeSent : results);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server`);
  }
};
