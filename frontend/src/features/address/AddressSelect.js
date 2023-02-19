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
import { AddressCard, AddressSimpleCard } from "../address";
import { checkoutActions } from "../checkout/checkoutSlice";

export default function AddressSelect({ onSubmit }) {
  const { response, error, loading, refetch } = useRequest(() =>
    ApiService.listAddresses()
  );
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      address: "",
    },
    onSubmit: (values) => {
      dispatch(checkoutActions.setAddress(values.address));
      onSubmit(values.address);
    },
  });

  return (
    <div>
      {loading ? (
        <Loading text="Loading addresses" />
      ) : error ? (
        <div>We couldn't get your data. Please, try again</div>
      ) : response ? (
        <form onSubmit={formik.handleSubmit}>
          <FormControl onSubmit={formik.onSubmit} fullWidth>
            <RadioGroup
              aria-labelledby="radio-buttons-group-label"
              name="radio-buttons-group"
            >
              {response
                .map((address) => (
                  <FormControlLabel
                    key={address.id}
                    value={address.id}
                    control={<Radio />}
                    label={<AddressSimpleCard key={address.id} {...address} />}
                    onClick={(e) => {
                      formik.setFieldValue("address", e.target.value);
                    }}
                    sx={{ marginTop: 2 }}
                  />
                ))}
            </RadioGroup>
          </FormControl>
          <SaveInfoButton text="Set address" sx={{ marginTop: 2 }} />
          <div></div>
        </form>
      ) : (
        <Typography>No addresses added</Typography>
      )}
    </div>
  );
}
