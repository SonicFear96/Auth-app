import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Container,
  Paper,
} from "@material-ui/core";
import { ContactList } from "../components/ContactList";

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
    // e.preventDefault();
    console.log(id);
    fetch("/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.res === "ok") {
          setContacts(contacts.filter((el) => el.id !== id));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleClick = (event) => {
    setSearchContact(event.target.value);
  };

  return (
    <>
      <Container maxWidth={"sm"}>
        <Paper elevation={3}>
          <Box p={2}>
            <Typography variant="h6" gutterBottom>
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
              <Grid item xs={12} sm={12}>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={(e) => handleSubmit(e)}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Box display="flex" justifyContent="center" m={2}>
          <TextField
            id="search"
            name="search"
            label="Search (name)..."
            value={searchContact}
            variant="standard"
            onChange={(event) => handleClick(event)}
          />
        </Box>

        <ContactList
          contacts={contacts}
          searchContact={searchContact}
          handleDelete={handleDelete}
        />
      </Container>
    </>
  );
};
