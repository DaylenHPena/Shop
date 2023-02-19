import {
  Box,
  Container,
  CssBaseline,
  styled,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { theme } from "../theme";
import "./Layout.css";
import Navbar from "./Navbar";

const MainDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "calc(100vh - 64px - 10px)",
}));

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: "2rem",
}));

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit">Shop</Link> {"2023."}
    </Typography>
  );
}

function Footer() {
  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: 1,
          padding: 3,
        }}
        component="footer"
      >
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        ></Typography>
        <Copyright />
      </Box>
    </>
  );
}

const Layout = ({ main, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <CssBaseline />
        <Navbar />
        {main}
        <MainDiv>
          <Main>{children}</Main>
          <Footer />
        </MainDiv>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
