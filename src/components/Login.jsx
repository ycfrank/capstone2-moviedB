import React, { useState } from "react";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import google from "../images/google.png";
import FacebookIcon from "@material-ui/icons/Facebook";
import app from "firebase";
import firebase from "firebase";

const Login = () => {
  const auth = app.auth();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const login = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      setErrors(error.message);
    }
  };

  const provider = new firebase.auth.GoogleAuthProvider();
  const authWithGoogle = async () => {
    await firebase.auth().signInWithPopup(provider);
    history.push("/");
  };

  const fbprovider = new firebase.auth.FacebookAuthProvider();
  const authWithFacebook = async () => {
    await firebase.auth().signInWithPopup(fbprovider);
    history.push("/");
  };

  const resetPassword = async () => {
    await auth.sendPasswordResetEmail(email);
    alert("Check your email for password reset");
  };

  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div style={{ marginTop: "2rem" }}>
      <Paper
        style={{
          maxWidth: "500px",
          margin: "1rem auto",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <Typography
          style={{
            marginBottom: "2rem",
            fontWeight: "600",
            textAlign: "center",
            color: "gray",
          }}
        >
          Sign In
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            autoComplete="off"
            label="email"
            variant="outlined"
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            required
            style={{ marginTop: "1rem" }}
          />
          <TextField
            autoComplete="off"
            label="password"
            variant="outlined"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            required
            style={{ marginTop: "1rem" }}
          />
          {errors && <Typography color="secondary">{errors}</Typography>}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
            onClick={login}
          >
            Sign in
          </Button>
        </form>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>
            <Link
              to="#"
              style={{
                textDecoration: "none",
                color: "#3f51b5",
                fontWeight: "600",
              }}
              onClick={resetPassword}
            >
              Forgot password?
            </Link>
          </Typography>
          <Typography>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "#3f51b5",
                fontWeight: "600",
              }}
            >
              Sign Up
            </Link>
          </Typography>
        </div>
      </Paper>
      <div
        style={{
          display: "flex",
          margin: "0 auto",
          justifyContent: "space-between",
          maxWidth: "500px",
          alignItems: "center",
        }}
      >
        <div style={{ width: "220px", border: "1px solid lightgray" }} />
        <Typography style={{ margin: "0.5rem" }}>Or</Typography>
        <div style={{ width: "220px", border: "1px solid lightgray" }} />
      </div>
      <div
        style={{
          display: "flex",
          maxWidth: "450px",
          margin: "0 auto",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="outlined"
          style={{ width: "250px", margin: ".5rem" }}
          onClick={authWithGoogle}
        >
          <img src={google} alt="google account icon" width="23px" />
        </Button>
        <Button
          variant="outlined"
          style={{ width: "250px", margin: ".5rem" }}
          onClick={authWithFacebook}
        >
          <FacebookIcon style={{ color: "#4267b2" }} />
        </Button>
      </div>
    </div>
  );
};

export default Login;
