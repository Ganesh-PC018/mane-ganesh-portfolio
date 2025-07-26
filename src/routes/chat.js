import { Router } from "express";
const router = Router();

// For dummy logic
router.post("/", async (req, res) => {
  const { message } = req.body;

  let reply = "I'm not sure how to respond to that.";

  if (message.toLowerCase().includes("skills")) {
    reply = "I'm skilled in React, TypeScript, Spring Boot, and Node.js.";
  } else if (message.toLowerCase().includes("project")) {
    reply = "Check out my portfolio projects built using React and Java!";
  } else if (message.toLowerCase().includes("email")) {
    reply = "You can contact me using the form on this site.";
  }

  res.json({ reply });
});

export default router;
