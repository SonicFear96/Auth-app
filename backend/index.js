const express = require("express");
const app = express();
const PORT = 5000;
const mock = { login: "test", password: "test" };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/auth", (req, res) => {
  if (req.body.login === mock.login && req.body.password === mock.password) {
    res.status(200).json({ auth: "true", res: "OK" });
  } else {
    res.status(403).json({ auth: "false", res: "неверные credentials" });
  }
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
