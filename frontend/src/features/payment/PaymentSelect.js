import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Loading, SaveInfoButton } from "../../components";
import { useRequest } from "../../lib/useRequest";
import ApiService from "../../services/ApiService";
import { checkoutActions } from "../checkout/checkoutSlice";
import PaymentCard from "./PaymentCard";

export default function PaymentSelect({ afterSubmit }) {
  const { response, error, loading, refetch } = useRequest(
    ()=> ApiService.listPaymentMethods()
  );
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      id: "",
    },
    onSubmit: (values) => {
      console.log('onsubmit')
      afterSubmit(values.id);
    },
  });


  return (
    <div>
      {loading ? (
        <Loading text="Loading payment methods" />
      ) : error ? (
        <div>We couldn't get your data. Please, try again</div>
      ) : response ? (
        <form onSubmit={formik.handleSubmit}>
          <FormControl onSubmit={formik.onSubmit}>
            <RadioGroup
              aria-labelledby="radio-buttons-group-label"
              name="radio-buttons-group"
            >
              {response.map((payment) => (
                <FormControlLabel
                key={payment.id}
                  value={payment.id}
                  control={<Radio />}
                  label={<PaymentCard key={payment.id} {...payment} />}
                  onClick={(e) => {
                    formik.setFieldValue("id", e.target.value);
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <SaveInfoButton width={1} text="Set payment method" />
        </form>
      ) : (
        <Typography>No payment method added</Typography>
      )}
    </div>
  );
}
