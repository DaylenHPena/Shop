import { Box, Fade, Grid, Modal, styled, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { ChangeButton } from "../../components";
import ApiService from "../../services/ApiService";
import { AddressOrDefaultItem, AddressSelect } from "../address";
import { PaymentSelect, PaymentOrDefaultItem } from "../payment";

const StyledForm = styled("form")((props) => ({ width: "100%" }));

export default function Selectors({ items, children, afterSubmit }) {
  const [openAddressSelect, setOpenAddressSelect] = React.useState(false);
  const [openPaymentSelect, setOpenPaymentSelect] = React.useState(false);
  const [values, setValues] = useState({
    shipping_address: "",
    payment_method: "",
  });

  const setdefaultPayment = () => {
    ApiService.retrievePaymentDefault().then((data) => {
      setPayment(data.id).catch((error) => {});
    });
  };

  const setdefaultAddress = () => {
    ApiService.retrieveAddressDefault().then((data) => {
      setAddress(data.id).catch((error) => {});
    });
  };

  useEffect(() => {
    setdefaultAddress();
    setdefaultPayment();
    return () => {};
  }, []);

  const afterAddressChange = (id) => {
    setAddress(id);
    setOpenAddressSelect(false);
  };
  const afterPaymentChange = (id) => {
    console.log("afterpaymen :>> ");
    setPayment(id);
    setOpenPaymentSelect(false);
  };

  const setAddress = (id) => {
    values.shipping_address = id;
    setValues({ ...values });
    console.log("values", values);
  };

  const setPayment = (id) => {
    values.payment_method = id;
    setValues({ ...values });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      ...values,
      order: items.map((item) => ({
        product: item.product.id,
        quantity: item.quantity,
      })),
    };
    ApiService.createOrder(newData)
      .then(() => {
        if (typeof afterSubmit == "function") afterSubmit();
      })
      .catch();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Grid container align="left" direction="column">
        <Grid
          container
          sx={{
            p: 2,
            "& .MuiFormControl-root": { m: 1 },
          }}
        >
          <Grid
            item
            xs={12}
            sm={9}
            md={9}
            container
            sx={{
              p: 2,
            }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Typography variant="h6">Shipping Address</Typography>
              <ChangeButton
                sx={{ align: "right" }}
                onClick={() => setOpenAddressSelect(true)}
              />
              <AddressOrDefaultItem
                id={
                  values.shipping_address != ""
                    ? values.shipping_address
                    : undefined
                }
              />
            </Grid>

            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Typography variant="h6">Payment method</Typography>
              <ChangeButton onClick={() => setOpenPaymentSelect(true)} />
              <Grid xs={12} md={4}><PaymentOrDefaultItem
                id={
                  values.payment_method != ""
                    ? values.payment_method
                    : undefined
                }
              /></Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            sx={{
              p: 2,
            }}
          >
            {children}
          </Grid>
        </Grid>

        <Modal
          id="modal-address"
          open={openAddressSelect}
          onClose={() => {
            setOpenAddressSelect(false);
          }}
        >
          <Fade in={openAddressSelect}>
            <Box className="modal-body">
              <Typography variant="inherit" align="center">
                Select an address
              </Typography>
              <AddressSelect onSubmit={afterAddressChange} />
            </Box>
          </Fade>
        </Modal>

        <Modal
          id="modal-payment"
          open={openPaymentSelect}
          onClose={() => {
            setOpenPaymentSelect(false);
          }}
        >
          <Fade in={openPaymentSelect}>
            <Box className="modal-body">
              <Typography variant="inherit" align="center">
                Select payment method
              </Typography>
              <PaymentSelect afterSubmit={afterPaymentChange} />
            </Box>
          </Fade>
        </Modal>
      </Grid>
    </StyledForm>
  );
}

Selectors.propTypes = {
  items: PropTypes.object.isRequired,
};
