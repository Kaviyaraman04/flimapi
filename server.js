const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Resend } = require("resend");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send-message", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    await resend.emails.send({
     from: "Your Website <hello@resend.dev>",
      to: process.env.TO_EMAIL,
      subject: "New Contact Form Submission",
      html: `
        <h3>New Contact Form Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/get", (req, res) => {
  res.send("Backend running...");
});

app.listen(5000, () => console.log("Server running on port 5000"));
