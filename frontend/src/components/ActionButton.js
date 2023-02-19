import { Button } from "@mui/material";
import React from "react";

export default function ActionButton(props) {
  return (
    <Button variant="contained" color="primary" fullWidth {...props}>
      {props.children}
    </Button>
  );
}
