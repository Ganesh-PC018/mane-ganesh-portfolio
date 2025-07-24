const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});


app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

const mailOptions = {
  from: process.env.MY_EMAIL,
  to: process.env.MY_EMAIL,
  replyTo: email,
  subject: `Porfolio message from ${name}`,
  text: `You have a new message from your portfolio contact form:
Name: ${name}
Email: ${email}
Message: ${message}
  `,
};

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error sending email" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
