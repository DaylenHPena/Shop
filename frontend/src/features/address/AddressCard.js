import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { Box, Typography } from "@mui/material";
import React from "react";
import { CardActions } from "../../components";
import ApiService from "../../services/ApiService";

export default function AddressCard({
  id,
  address_line_1,
  address_line_2,
  city,
  region,
  zip_code,
  is_default,
  onDelete,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleDelete = () => {
    handleClose();
    ApiService.deleteAddress(id).then(() => {
      if (typeof onDelete == "function") onDelete();
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const actions = ["Remove", handleDelete];

  return (
    <Box
      sx={{
        borderRadius: "16px",
        border: "1px solid #c2c2c2",
        p: 2,
        backgroundColor: "white",
      }}
    >
      {is_default ? <Typography textAlign="right">Default</Typography> : null}
      <Typography>
        <PlaceOutlinedIcon />
        {address_line_1}
        {address_line_2 ? `, ${address_line_2}` : null}
      </Typography>
      <Typography>
        {city},{region}-{zip_code}
      </Typography>
      <CardActions
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        anchorEl={anchorEl}
        itemsActions={is_default ? [] : [actions]}
      />
    </Box>
  );
}

export function AddressSimpleCard({
  id,
  address_line_1,
  address_line_2,
  city,
  region,
  zip_code,
  is_default,
}) {
  return (
    <Box
      sx={{
        borderRadius: "16px",
        border: "1px solid #c2c2c2",
        p: 2,
        backgroundColor: "white",
      }}
    >
      {is_default ? <Typography textAlign="right">Default</Typography> : null}
      <Typography>
        <PlaceOutlinedIcon />
        {address_line_1}
        {address_line_2 ? `, ${address_line_2}` : null}
      </Typography>
      <Typography>
        {city},{region}-{zip_code}
      </Typography>
    </Box>
  );
}
