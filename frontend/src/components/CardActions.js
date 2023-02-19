import { Box, Grid, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PropTypes from "prop-types";

export default function CardActions({
  open,
  handleOpen,
  handleClose,
  anchorEl,
  itemsActions,
}) {
  return (
    <Grid container alignItems="flex-end">
      <Box flexGrow={1}></Box>
      <MoreVertIcon onClick={handleOpen} />
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        onClose={handleClose}
        open={open}
      >
        {itemsActions
          ? itemsActions.map(([text, action]) => (
              <MenuItem key={text}>
                <Typography textAlign="center" onClick={action}>
                  {text}
                </Typography>
              </MenuItem>
            ))
          : null}
      </Menu>
    </Grid>
  );
}

//TODO structure of itemsAction [text,func]
CardActions.propTypes = {
  itemsActions: PropTypes.array,
};
