import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { CardActions } from "../../components";
import ApiService from "../../services/ApiService";

function DisplayedNumber(account_number) {
  const str = String(account_number.account_number);
  const length = str.length;
  return length > 4 ? `**** ${str.substring(length - 5, length - 1)}` : str;
}

function PaymentCard({
  id,
  account_number,
  is_default,
  onDelete,
  owner,
  ...extraProps
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = () => {
    handleClose();
    ApiService.deletePayment(id).then(() => {
      if (typeof onDelete == "function") onDelete();
    });
  };

  const actions = ["Remove", handleDelete];

  return (
    <Box
      width={1}
      sx={{
        borderRadius: "16px",
        border: "1px solid #c2c2c2",
        p: 2,
        backgroundColor: "white",
      }}
    >
      {is_default ? <Typography textAlign="right">Default</Typography> : null}
      <Grid
        container
        marginBottom={4}
        sx={{ width: 1 }}
        justifyContent="space-between"
        alignItems="stretch"
      >
        <DisplayedNumber account_number={account_number} />
        <CreditCardIcon />
      </Grid>
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

export default PaymentCard;
