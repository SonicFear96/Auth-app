import React from "react";
import {
  Grid,
  Typography,
  CardActionArea,
  Card,
  Box,
  CardContent,
  Button,
  Paper,
} from "@material-ui/core";

export const ContactList = ({ searchContact, contacts, handleDelete }) => {
  return (
    <Box width="100%">
      <Grid container direction="column" justifyContent="center" spacing={1}>
        {contacts.length ? (
          contacts
            .filter((val) =>
              val.name.toLowerCase().includes(searchContact.toLowerCase())
            )
            .map((el) => {
              return (
                <Grid item xs={12}>
                  <Box>
                    <Paper elevation={3}>
                      <Typography color="inherit">
                        <Grid key={el.id}>
                          <CardActionArea>
                            <Card>
                              <CardContent>
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
                            </Card>
                          </CardActionArea>
                        </Grid>
                      </Typography>
                    </Paper>
                  </Box>
                </Grid>
              );
            })
        ) : (
          <Box display="flex" justifyContent="center" m={2}>
            <Typography>Нет данных</Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
};
