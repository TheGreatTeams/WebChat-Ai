import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import gemini from "./requests/aiIndex.js";

const PORT = 8888;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "web.html"));
});

app.post("/api/v1/ask", async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ msg: "Parameter Required" });
  }

  try {
    const data = await gemini.chat(text);
    return res.status(200).json({ result: data });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;