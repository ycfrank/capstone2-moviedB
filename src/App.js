import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import app from "./firebase";
import { getUser } from "./redux/userActions";
import MovieDetailPage from "./components/MovieDetailPage";
import Favorite from "./components/Favorite";

function App() {
  const auth = app.auth();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(getUser(authUser));
      } else {
        dispatch(getUser(null));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth, dispatch]);

  return (
    <BrowserRouter>
      <Header user={user} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/movie/:movieId" component={MovieDetailPage} />
        <Route path="/favorite" component={Favorite} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
