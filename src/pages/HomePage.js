import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";

export const HomePage = () => {
  const [data, setData] = useState({ login: "", password: "" });
  const history = useHistory();

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.auth === "true") {
          localStorage.setItem("auth", data.auth);
          history.push("/profile");
        } else {
          //react toast
          console.log(data);
        }
      })
      .catch((err) => console.log(err)); //react toast
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: 100 }}>
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Login"
            name="login"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e) => handleSubmit(e)}
          >
            Войти
          </Button>
        </form>
      </div>
    </Container>
);
}
 