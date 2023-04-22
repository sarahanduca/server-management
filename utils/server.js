import express from "express";
import { getRandomFact } from "../api.js";

export default function createServer(port = 3000) {
  const app = express();
  app.listen(port, () => {
    console.log("Listening on port " + port);
  });

  app.get("/", async (req, res) => {
    const fact = await getRandomFact();
    const page = `
    <html>
      <head>
        <title>Server Management</title>
      </head>
      <body style="font-family: Courier,monospace; text-align: center;background: #1a1a1a;color: #e5eaee;">
        <h1>✨Server Management✨</h1>
        <h3>Some totally random fact 👈👇</h3>
        <p style="font-weight: bold;">🤓: ${fact}<p>
        <p style="color: #585858;font-weight: bold;">Refresh for a new fact.</p>
      </body>
    `;
    try {
      res.send(page);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error to load fact");
    }
  });
}
