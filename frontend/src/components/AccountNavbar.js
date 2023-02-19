import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";

export default function AccountNavbar({ items, onClick,...extraProps }) {
  return (
    <Box component="div">
      
      <List>
        {items?.map((item) => (
          <ListItem key={item} onClick={onClick}>
            <ListItemText primary={item.toUpperCase()} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
