const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const baseUrl = require("../utils/baseUrl");
const isEmail = require("validator/lib/isEmail");

const transporter = nodemailer.createTransport({
  // cấu hình máy chủ thư
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "hnhai.ht@gmail.com", //Tài khoản gmail
    pass: "toiyeuchame", //Mật khẩu
  },
  tls: {
    // không thất bại trên chứng chỉ không hợp lệ
    rejectUnauthorized: false,
  },
});

module.exports.postResetEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!isEmail(email)) {
      return res.status(401).send("Email không hợp lệ !");
    }

    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).send("Tài khoản không tồn tại !");
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.expireToken = Date.now() + 3600000; // 1 giờ

    await user.save();

    const href = `${baseUrl}/reset/${token}`;

    const mailOptions = {
      to: user.email,
      from: "UTC2 NetWork",
      subject: "Chào bạn! Yêu cầu đặt lại mật khẩu",
      html: `<p>Chào ${user.name
        .split(" ")[0]
        .toString()}, Đã có yêu cầu đặt lại mật khẩu. <a href=${href}>Nhấp vào liên kết này để đặt lại mật khẩu </a>   </p>
        <p>Mã thông báo này chỉ có giá trị trong 1 giờ.</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => err && console.log(err));

    return res.status(200).send("Email đã được gửi thành công");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Lỗi Server !");
  }
};

module.exports.postUpdatePass = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token) {
      return res.status(401).send("Unauthorized");
    }

    if (password.length < 6)
      return res.status(401).send("Mật khẩu phải ít nhất 6 kí tự !");

    const user = await UserModel.findOne({ resetToken: token });

    if (!user) {
      return res.status(404).send("Không tìm thấy người dùng !");
    }

    if (Date.now() > user.expireToken) {
      return res.status(401).send("Mã thông báo đã hết hạn. Tạo mã mới !");
    }

    user.password = await bcrypt.hash(password, 10);

    user.resetToken = "";
    user.expireToken = undefined;

    await user.save();

    return res.status(200).send("Mật khẩu được cập nhật !");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Lỗi Server !");
  }
};
