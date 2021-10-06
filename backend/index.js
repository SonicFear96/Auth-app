const express = require("express");
const app = express();
const PORT = 5000;
const mock = { login: "test", password: "test" };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let contacts = [];

app.post("/auth", (req, res) => {
  const { login, password } = req.body;
  if (login === mock.login && password === mock.password) {
    res.status(200).json({ auth: "true", res: "OK" });
  } else {
    res.status(403).json({ auth: "false", res: "неверные credentials" });
  }
});

app.post("/add", (req, res) => {
  const { name, number } = req.body;
  const contact = { name, number, id: Math.random() * 1000 };
  console.log(req.body);
  contacts.push(contact);
  res.status(200).json({ res: "ok", contact });
});

app.get("/getContacts", (req, res) => {
  res.json(contacts);
});

app.post("/delete", (req, res) => {
  contacts = contacts.filter((contact) => contact.id !== req.body.id);
  console.log(contacts);
  res.status(200).json({ res: "ok" });
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
