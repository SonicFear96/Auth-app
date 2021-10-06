import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";

function PrivateRoute({ children, ...rest }) {
  let auth = localStorage.getItem("auth");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth === "true" ? children : <Redirect to="/" />
      }
    />
  );
}

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <PrivateRoute path="/profile" exact>
          <ProfilePage />
        </PrivateRoute>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};
