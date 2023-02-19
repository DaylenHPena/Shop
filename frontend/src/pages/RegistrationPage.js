import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HttpsIcon from '@mui/icons-material/Https';
import EmailIcon from '@mui/icons-material/Email';
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";
import { theme } from "../theme/index";

function RegistrationPage() {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },

    onSubmit: async (values) => {
      ApiService.registerUser({
        username: values.username,
        email: values.email,
        password: values.password,
      })
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //TODO: validate fields
    //TODO: add error fields to html
    validate: (values) => {
      const errors = {};

      if (
        values.username != "" &&
        values.password != "" &&
        values.confirm_password != "" &&
        values.confirm_password != values.password
      ) {
        errors.confirm_password = "Must be equal to your password";
      }
      //else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.password)) { errors.email = 'Invalid email address'; }
      return errors;
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="username"
              name="username"
              label="Username"
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={formik.values.username}
              {...formik.getFieldProps("username")}
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
            {formik.errors.username ? (
              <div className="form-errors">
                <p>{formik.errors.username}</p>
              </div>
            ) : null}

            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={formik.values.email}
              {...formik.getFieldProps("email")}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
            {formik.errors.email ? (
              <div className="form-errors">
                <p>{formik.errors.email}</p>
              </div>
            ) : null}

            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="Enter a password"
              className="form-control"
              value={formik.values.password}
              {...formik.getFieldProps("password")}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HttpsIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
            {formik.errors.password ? (
              <div className="form-errors">
                <p>{formik.errors.password}</p>
              </div>
            ) : null}

            <TextField
              id="confirm_password"
              name="confirm_password"
              label="Confirm password"
              type="password"
              placeholder="Repeat your password"
              className="form-control"
              value={formik.values.confirm_password}
              {...formik.getFieldProps("confirm_password")}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HttpsIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
            {formik.errors.confirm_password ? (
              <div className="form-errors">
                <p>{formik.errors.confirm_password}</p>
              </div>
            ) : null}

            <Button variant="contained" type="submit">
              Sign up
            </Button>
          </form>
          Already have an account ?{" "}
          <Link to="/login/">Login instead</Link>
        </Box>
        <Box item sx={{ flexGrow: 1 }}></Box>
      </Grid>
    </ThemeProvider>
  );
}

export default RegistrationPage;
