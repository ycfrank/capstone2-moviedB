import React, { useState } from "react";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import google from "../images/google.png";
import FacebookIcon from "@material-ui/icons/Facebook";
import firebase from "firebase";
import app from "../firebase";

const Register = () => {
  const auth = app.auth();
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const registerUser = async () => {
    try {
      const newUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      history.push("/");
      return await newUser.user.updateProfile({
        displayName: name,
      });
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

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
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
          Sing Up
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            label="name"
            variant="outlined"
            type="name"
            value={name}
            name="name"
            onChange={handleChangeName}
            required
            style={{ marginTop: "1rem" }}
          />

          <TextField
            label="email"
            variant="outlined"
            type="email"
            value={email}
            name="email"
            required
            style={{ marginTop: "1rem" }}
            onChange={handleChangeEmail}
          />

          <TextField
            label="password"
            variant="outlined"
            type="password"
            value={password}
            name="password"
            required
            style={{ marginTop: "1rem" }}
            onChange={handleChangePassword}
          />
          {errors && <Typography color="secondary">{errors}</Typography>}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginBottom: "1rem", marginTop: "2rem" }}
            onClick={registerUser}
          >
            Sign Up
          </Button>
        </form>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "#3f51b5",
                fontWeight: "600",
              }}
            >
              Log In
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

export default Register;
