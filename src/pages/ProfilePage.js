import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardContent, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

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
              label="number"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e)}
            />
            {/* 
        <input
          type="text"
          placeholder="Search (name)..."
          value={searchContact}
          onChange={(event) => handleClick(event)}
        /> */}
          </Grid>
          <Button
            className="button__add"
            type="submit"
            sx={{ mt: 3, ml: 1 }}
            variant="contained"
            onClick={(e) => handleSubmit(e)}
          >
            Add
          </Button>
        </Grid>
      </div>
      <Grid style={{ marginTop: 20 }}>
        {contacts.length &&
          contacts
            .filter((val) =>
              val.name.toLowerCase().includes(searchContact.toLowerCase())
            )
            .map((el) => {
              return (
                <Paper elevation={3}>
                  <Typography color="inherit">
                    <Grid style={{ marginTop: 20 }}>
                      <CardActionArea component="a" href="#">
                        <Card key={el.id}>
                          <div>
                            <CardContent>
                              <Typography
                                variant="subtitle1"
                                color="textSecondary"
                              >
                                {el.name}
                              </Typography>
                              <Typography variant="subtitle1" paragraph>
                                {el.number}
                              </Typography>
                              <Typography variant="subtitle1" color="primary">
                                <Button
                                  type="submit"
                                  sx={{ mt: 3, ml: 1 }}
                                  variant="contained"
                                  color="primary"
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
    </>
  );
};
