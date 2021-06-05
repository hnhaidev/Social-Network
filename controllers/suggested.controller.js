const UserModel = require("../models/UserModel");
const FollowerModel = require("../models/FollowerModel");

module.exports.suggested = async (req, res) => {
  try {
    const { userId } = req;

    const users = await UserModel.find();

    // const followingUser = await FollowerModel.findOne({
    //   user: userId,
    // }).populate("following.user");

    const arr1 = users.filter(
      (val) => val._id.toString() !== userId && val.username !== "admin"
    );

    // if (followingUser.length > 0) {
    //   const flw = followingUser.following.map((val) => val.user._id.toString());

    //   const result = arr1.filter(
    //     (value) => !flw.includes(value._id.toString())
    //   );

    //   return res.status(200).json(result);
    // }
    //
    return res.status(200).json(arr1);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server`);
  }
};
