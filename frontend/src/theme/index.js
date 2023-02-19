import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#504a5c",
      dark: "#281644",
      light: "#6f3aa4",
    },
    secondary: {
      main: "#028cad",
      dark: "#206975",
      light: "#57f0d3",
    },
    info: {
      main: "#ffff",
      dark: "#ffff",
      light: "#ffff",
    },
    background: {
      default: "#ffffff",
      paper: "#f6f6fb",
    },
  },
  typography: {
    fontFamily: ["Signika"],
  },
});
