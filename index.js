const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

let notes = [
  {
    id: "1",
    content: "html is easy",
    important: true,
  },
  {
    id: "2",
    content: "browser can execute only js",
    important: true,
  },
  {
    id: "3",
    content: "get and post are the most important methods of http protocol",
    important: false,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>hello, world<h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((n) => n.id === id);

  if (note) res.json(note);
  else res.status(404).end();
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((n) => n.id !== id);

  res.status(204).end();
});

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;

  return String(maxId + 1);
};

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  };

  notes = [...notes, note];
  res.json(notes);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
