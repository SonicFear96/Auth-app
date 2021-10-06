import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  CardActionArea,
  Card,
  CardContent,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";

export const ProfilePage = () => {
  const [fieldsData, setFieldsData] = useState({ name: "", number: "" });
  const [contacts, setContacts] = useState([]);
  const [searchContact, setSearchContact] = useState("");

  useEffect(() => {
    fetch("/getContacts")
      .then((res) => res.json())
      .then((data) => setContacts(data));
  }, []);

  const handleChange = (e) => {
    setFieldsData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fieldsData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.res === "ok") {
          setContacts((prev) => [...prev, data.contact]);
        }
      }) //react toast
      .catch((err) => console.log(err)); //react toast
  };

  const handleDelete = (id) => {
    setContacts(contacts.filter((el) => el.id !== id));
    console.log(`Пост №${id} удален`);
  };

  const handleClick = (event) => {
    setSearchContact(event.target.value);
  };

  return (
    <>
      <div className="main__form">
        <div className="form__content">
          <Typography className="form main__title" variant="h6" gutterBottom>
            Add contact
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="name"
                name="name"
                label="Name"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="number"
                name="number"
                label="Number"
                fullWidth
                variant="standard"
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid className="button__wrapper" item xs={12} sm={12}>
              <Button
                className="button__add"
                type="submit"
                variant="contained"
                onClick={(e) => handleSubmit(e)}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="wrapper__input">
        <Grid item xs={12} sm={12}>
          <TextField
            className="input__search"
            id="search"
            name="search"
            label="Search (name)..."
            value={searchContact}
            variant="standard"
            onChange={(event) => handleClick(event)}
          />
        </Grid>
      </div>
      <div className="main__container">
        <Grid className="contact__wrapper" Grid item xs={12} sm={6}>
          {contacts.length &&
            contacts
              .filter((val) =>
                val.name.toLowerCase().includes(searchContact.toLowerCase())
              )
              .map((el) => {
                return (
                  <Paper elevation={3}>
                    <Typography color="inherit">
                      <Grid>
                        <CardActionArea>
                          <Card>
                            <div>
                              <CardContent className="card__content">
                                <Typography component="h2" variant="h5">
                                  Name: {el.name}
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  color="textSecondary"
                                >
                                  Number: {el.number}
                                </Typography>
                                <Typography variant="subtitle1" paragraph>
                                  <Button
                                    className="button__delete"
                                    type="submit"
                                    sx={{ mt: 3, ml: 1 }}
                                    variant="contained"
                                    color=""
                                    onClick={() => handleDelete(el.id)}
                                  >
                                    delete
                                  </Button>
                                </Typography>
                              </CardContent>
                            </div>
                          </Card>
                        </CardActionArea>
                      </Grid>
                    </Typography>
                  </Paper>
                );
              })}
        </Grid>
      </div>
    </>
  );
};
