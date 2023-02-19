import { Button } from "@mui/material";
import React from "react";

export default function SaveInfoButton({ text, ...extraProps }) {
  return (
    <Button type="submit" variant="contained" color="secondary" {...extraProps}>
      {text || "Save"}
    </Button>
  );
}
