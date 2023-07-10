// const Razorpay = require("razorpay");
// const crypto = require("node:crypto");

// const order = (req, res) => {
//   const { fee } = req.body;
//   const instance = new Razorpay({
//     key_id: "rzp_test_ECaMBpTyhH6emB",
//     key_secret: "twi58rYbBoHGkNC18XOCmWIe",
//   });
//   const options = {
//     amount: fee  * 100,
//     currency: "INR",
//     receipt: crypto.randomBytes(10).toString("hex"),
//   };
//   instance.orders.create(options, function (error, order) {
//     if (error) {
//       return res.json({ data:false});
//     }
//     res.json({data:order});
//   });
// };

//  const verifyPayment = async (req, res) => {

//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body;
//     const sign = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSign = crypto
//       .createHmac("sha256", "twi58rYbBoHGkNC18XOCmWIe")
//       .update(sign.toString())
//       .digest("hex");
//     if (razorpay_signature === expectedSign) {
//       return res.status(200).json({ message: "Payment verified succesfully!" });
//     } else {
//       return res.status(400).json({ message: "Invalid signature sent!" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Internal server error!" });
//   }
// };

// module.exports = {order,verifyPayment};

const Razorpay = require("razorpay");
const crypto = require("node:crypto");
const dotenv = require("dotenv");
dotenv.config();
const order = (req, res) => {
  const { fee } = req.body;
  const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });
  const options = {
    amount: fee * 100,
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
  };
  instance.orders.create(options, function (error, order) {
    if (error) {
      return res.json({ data: false });
    }
    res.json({ data: order });
  });
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", "twi58rYbBoHGkNC18XOCmWIe")
      .update(sign.toString())
      .digest("hex");
    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified succesfully!" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = { order, verifyPayment };
