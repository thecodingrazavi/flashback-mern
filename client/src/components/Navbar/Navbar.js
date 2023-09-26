import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar
      sx={{
        borderRadius: "15px",
        margin: "30px 0",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        paddingY: "10px",
        paddingX: { xs: "10px", sm: "30px", md: "40px", lg: "50px" },
        justifyContent: "space-between",
        alignItems: "center",
      }}
      position="static"
      color="inherit"
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <Typography
          component={Link}
          to="/"
          sx={{
            color: "rgba(0,183,255, 1)",
            fontSize: { xs: "23px", sm: "40px" },
            textDecoration: "none",
          }}
          align="center"
        >
          FLASHBACK
        </Typography>
      </Link>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: { xs: "auto", sm: "400px" },
        }}
      >
        {user ? (
          <div
            style={{
              display: "flex",
              justifyContent: { xs: "center", sm: "space-between" },
              width: { xs: "auto", sm: "400px" },
              alignItems: "center",
              marginTop: { xs: "20px", sm: "auto" },
            }}
          >
            <Avatar
              sx={{
                color: "white",
                backgroundColor: "purple",
                fontSize: { xs: "18px", sm: "25px" },
                height: { xs: "30px", sm: "40px" },
                width: { xs: "30px", sm: "40px" },
              }}
              alt={user.result.name}
              src={user.result.picture}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                marginLeft: "5px",
                fontSize: { xs: "16px", sm: "25px" },
              }}
            >
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={logout}
              sx={{ marginLeft: "20px" }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Log in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
