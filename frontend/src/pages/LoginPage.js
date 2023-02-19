import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUsername, login } from "../features/user/userSlice";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "../theme/index";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";

function LoginPage() {
  const username = useSelector(selectUsername);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      dispatch(login(values))
        .unwrap()
        .then(() => {
          console.log("then....");
          if (error) setError(false);
          navigate("/");
        })
        .catch((error) => {
          setError(true);
          console.log("error", error);
        });
    },
  });

  function Error() {
    return error ? <Typography>Incorrect email or password</Typography> : null;
  }

  return (
    <ThemeProvider theme={theme}>
      {!username ? (
        <Grid container>
          <Box item sx={{ flexGrow: 1 }}></Box>
          <Box
            item
            xs={12}
            md={2}
            sx={{
              p: 3,
              "& .MuiFormControl-root": { m: 2 },
            }}
          >
            <Typography variant="h4">Sign in</Typography>
            <Error />
            <form onSubmit={formik.handleSubmit} className="p-5 text-start">
              <TextField
                id="email"
                name="email"
                label="Email"
                type="text"
                placeholder="Enter email"
                autoComplete="username"
                value={formik.values.email}
                {...formik.getFieldProps("email")}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                className="form-control"
                autoComplete="current-password"
                value={formik.values.password}
                {...formik.getFieldProps("password")}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                }}
              ></TextField>

              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </form>
            Don't have an account ? <Link to="/registration">Sign up now</Link>
          </Box>
          <Box item sx={{ flexGrow: 1 }}></Box>
        </Grid>
      ) : (
        <div>
          <Typography variant="h3">Hi,</Typography>
          <Typography variant="h1">{username}</Typography>
          <Link to="/">Go shopping</Link>
        </div>
      )}
    </ThemeProvider>
  );
}

export default LoginPage;
