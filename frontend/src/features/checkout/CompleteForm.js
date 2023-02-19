import { Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import ApiService from "../../services/ApiService";
import {
  AddressFormFields,
  initialValues as initialValuesAddress,
} from "../address";
import {
  initialValues as initialValuesPayment,
  PaymentFormFields,
  validate as validatePayment,
} from "../payment";
import PropTypes from "prop-types";

function CompleteForm({ items, children, afterSubmit }) {
  const formik = useFormik({
    initialValues: {
      ...initialValuesAddress,
      ...initialValuesPayment,
      is_default: true,
    },
    validate: (values) => {
      return validatePayment(values);
    },
    onSubmit: (values) => {
      let address = undefined;
      let payment = undefined;
      ApiService.createAddress(values)
        .then((data) => {
          address = data;
          ApiService.createPaymentMethods(values).then((data) => {
            payment = data;
            const newData = {
              shipping_address: address?.id,
              payment_method: payment?.id,
              order: items.map((item) => ({
                product: item.product.id,
                quantity: item.quantity,
              })),
            };
            ApiService.createOrder(newData)
              .then((data) => {
                if (typeof afterSubmit == "function") afterSubmit();
              })
              .catch((error) => {
                console.log("error :>> ", error);
              });
          });
        })
        .catch((error) => {
          console.log("form error ", error.data);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
          <Typography variant="h6" marginY={2}>
            Shipping Address
          </Typography>

          <AddressFormFields formik={formik} />

          <Typography variant="h6" marginY={2}>
            Payment method
          </Typography>

          <PaymentFormFields formik={formik} />
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
    </form>
  );
}

CompleteForm.propTypes = {
  items: PropTypes.object.isRequired,
};

export default CompleteForm;
