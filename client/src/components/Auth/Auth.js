import React, { useEffect, useState } from "react";
// import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import { signin, signup } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  // const handleCallbackResponse = async (res) => {
  //     // console.log(response.credential);
  //     // var userObject = jwt_decode(response.credential);
  //     // console.log(userObject);
  //     // setUser(userObject);
  //     const result = jwt_decode(res?.credential);
  //     // const token = res?.tokenId;
  //     try {
  //       dispatch({ type: "AUTH", data: { result }});
  //       navigate('/');
  //     } catch (error) {
  //       console.log(error)
  //     }
  // }
  // useEffect(() => {
  //   // global google
  //   google.accounts.id.initialize({
  //     client_id: "487212511909-u4bheshbk6ket3u0nua6nm8qvpu97qi1.apps.googleusercontent.com",
  //     ux_mode: "popup",
  //     callback: handleCallbackResponse
  //   })
  //   google.accounts.id.renderButton(
  //     document.getElementById("signInDiv"),
  //     {theme: "outline", size: "large"},
  //   )
  // }, [])

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: "64px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "24px",
        }}
      >
        <Avatar sx={{ margin: "8px", bgcolor: "pink" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign up" : "Log in"}</Typography>
        <form
          style={{ width: "100%", marginTop: "24px" }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ margin: "24px 0 16px" }}
          >
            {isSignup ? "Sign up" : "Log in"}
          </Button>
          {/* <div style={{ 
            margin: "20px 0", alignItems: "center" }} 
            id="signInDiv"
           /> */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Log in"
                  : "Don't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
