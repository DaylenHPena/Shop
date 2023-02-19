import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { SaveInfoButton } from "../../components";
import { useRequest } from "../../lib/useRequest";
import ApiService from "../../services/ApiService";
import {
  fetchCities,
  fetchRegions,
  fetchRegionsCitiesData
} from "../../services/CountryDataService";
export const initialValues = {
  address_line_1: "",
  address_line_2: "",
  city: "",
  region: "",
  zip_code: "",
};

export const validate = (values) => {
  const errors = {};
  if (values.zip_code.length < 5 || values.zip_code.length > 5) {
    errors.account_number = "Must be 5 digit long";
  }
  return errors;
};

export function AddressForm({
  initialValues,
  setState,
  beforeSubmit,
  afterSubmit,
}) {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      ApiService.createAddress(values)
        .then(() => {
          if (typeof afterSubmit == "function") {
            afterSubmit();
          }
        })
        .catch((error) => {
          console.log("form error ", error.data);
        });
    },
  });

  return (
    <Box
      sx={{
        p: 2,
        "& .MuiFormControl-root": { m: 1 },
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <AddressFormFields formik={formik} />
        <SaveInfoButton sx={{ width: "50%", marginTop: 3 }} />
      </form>
    </Box>
  );
}

export function AddressFormFields({ formik }) {
  const [cities, setCities] = useState([]);
  const { response } = useRequest(()=>fetchRegionsCitiesData());

  function ErrorMessage({ field }) {
    return (
      formik.touched[field] &&
      typeof formik.errors[field] != "undefined" && (
        <div>{formik.errors[field]}</div>
      )
    );
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          type="text"
          name="address_line_1"
          id="address_line_1"
          label="Address"
          placeholder="Street, house/apartment number"
          {...formik.getFieldProps("address_line_1")}
          required
          fullWidth
        />
        <ErrorMessage field="address_line_1" />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          type="text"
          name="address_line_2"
          id="address_line_2"
          placeholder="Apt, unit, etc (Optional)"
          {...formik.getFieldProps("address_line_2")}
          fullWidth
        />
        <ErrorMessage field="address_line_2" />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          type="text"
          name="zip_code"
          id="zip_code"
          label="Zip Code"
          placeholder="Zip code"
          {...formik.getFieldProps("zip_code")}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length < 6 && !isNaN(value))
              formik.setFieldValue("zip_code", value);
          }}
          required
          fullWidth
        />
        <ErrorMessage field="zip_code" />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="region-label">State</InputLabel>
          <Select
            labelId="region"
            id="region"
            label="Region"
            {...formik.getFieldProps("region")}
            onChange={(e) => {
              formik.setFieldValue("region", e.target.value);
              setCities(fetchCities(response, e.target.value));
            }}
            required
          >
            {fetchRegions(response).map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </Select>
          <ErrorMessage field="region" />
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="city-label">City</InputLabel>
          <Select
            labelId="city"
            id="city"
            label="city"
            {...formik.getFieldProps("city")}
            required
          >
            {cities.map((region) => (
              <MenuItem value={region}>{region}</MenuItem>
            ))}
          </Select>
          <ErrorMessage field="city" />
        </FormControl>
      </Grid>
    </Grid>
  );
}

AddressForm.defaultProps = { initialValues: initialValues };
AddressFormFields.propTypes = {
  formik: PropTypes.object.isRequired,
};
