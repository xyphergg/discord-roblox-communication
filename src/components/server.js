import express from 'express';
import cors from "cors";

const app = express();
app.use(express.json());

function checkApiSecret(req, res, next) {
  // console.log("Request:", req); NOPE!
  const token = req.headers['x-api-key']; // Bot/Game must send this header
  if (token !== process.env.API_KEY) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
}

let latestCommand = [];

app.use(cors({ origin: false }));

app.get('/', checkApiSecret, (req, res) => {
    res.send('Welcome to the Discord-Roblox Communication Server!');
});

app.post("/command", checkApiSecret, (req, res) => {
  latestCommand.push(req.body);
  console.log("New command:", latestCommand);
  res.sendStatus(200);
});

app.get("/latest", checkApiSecret, (req, res) => {
  res.json(latestCommand);
});

app.delete("/exec", checkApiSecret, (req, res) => {
    let identifier = req.query.id || null;
    if (!identifier) {
        return res.status(400).json({ error: "Missing command identifier" });
    }

   const index = latestCommand.findIndex(cmd => cmd.id === identifier);
    if (index === -1) return res.status(404).json({ error: "Command not found" });
    try {
        const removedCommand = latestCommand.splice(index, 1)[0];
        res.json({ ok: true, removedCommand });
    } catch (error) {
        console.error("Error removing command:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bridge running on port ${PORT}`));

export default latestCommand;