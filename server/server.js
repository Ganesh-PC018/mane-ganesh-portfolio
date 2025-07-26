const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const axios = require("axios");
require("dotenv").config();
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../dist"))); // For serving the built React app

// Nodemailer route remains the same
// 📬 Nodemailer Email Route
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
    subject: `Portfolio message from ${name}`,
    text: `You have a new message:
Name: ${name}
Email: ${email}
Message: ${message}`,
  };
})
// ✨ IMPROVED: Chatbot route with a more robust prompt and JSON response format
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  // Full profile data to be used by the AI
  const ganeshProfileContext = `
    - Name: Ganesh Mane
    - Role: Java Full Stack Developer
    - Location: Nanded, Maharashtra
    - Contact: mane.ganesh.pc@gmail.com, LinkedIn (ganeshrmane), GitHub (Ganesh-PC018)
    - Summary: A motivated IT student seeking a Java Full Stack Developer internship. Proven ability to build scalable applications using Java, Spring Boot, and React. Strong foundation in DSA, Microservices, and AWS.
    - Skills: 
        - Languages: Java, Python, JavaScript, SQL
        - Frameworks: Spring Boot, React, Node.js
        - Databases: MySQL, PostgreSQL, Redis, MongoDB
        - Tools: Git, Docker, Kafka, Wireshark, Nmap
    - Projects:
        1. Billing System: Spring Boot, React, JWT, Razorpay for payments.
        2. AI Chat App: MERN Stack, Google Gemini API, Redis, Socket.IO for real-time chat.
        3. Hotel Booking App: Spring Boot, React, JWT, MySQL.
    - Experience: Cyber Security Intern at C-DAC, using Snort, Wireshark, and Nmap.
    - Achievements: Top 1% on GeeksforGeeks, 5-star Java on HackerRank, 200+ LeetCode problems.
  `;
  
  const systemPrompt = `
    You are an expert AI assistant for Ganesh Mane's portfolio. Your job is to answer questions based ONLY on the provided context.
    Your response MUST be a single, valid JSON object and nothing else.

    **Response Rules:**
    1.  If the user asks for the 'resume' or 'CV', respond with this EXACT JSON:
        {"action": "DOWNLOAD_RESUME", "text": "Of course! Here is the link to download Ganesh's resume. It includes details on his projects, skills, and experience."}

    2.  For any other question related to Ganesh's profile (skills, projects, experience, contact, etc.), answer it using the context provided. Your JSON response should be:
        {"action": "REPLY", "text": "Your helpful and concise answer here."}

    3.  If the user asks a question completely unrelated to Ganesh Mane (e.g., 'What is the capital of France?', 'write me a joke'), you MUST respond with this EXACT JSON:
        {"action": "FALLBACK", "text": "I can only answer questions about Ganesh Mane's skills, projects, and professional background. How can I help with that?"}

    **Ganesh's Profile Context:**
    ${ganeshProfileContext}
  `;

  try {
    const gptRes = await axios.post(
      "https://api.together.xyz/v1/chat/completions",
      {
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        response_format: { "type": "json_object" }, // Ask for JSON output
        max_tokens: 250,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const replyContent = gptRes.data.choices[0].message.content;

    // Parse the JSON string from the AI's response
    const replyJson = JSON.parse(replyContent);
    res.json({ reply: replyJson });

  } catch (error) {
    console.error("Together.ai Error:", error.response?.data || error.message);
    res.status(500).json({
      reply: {
        action: "FALLBACK",
        text: "Sorry, I'm having a little trouble connecting to my brain right now. Please try again in a moment.",
      },
    });
  }
});

// Serve frontend (must be last)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));