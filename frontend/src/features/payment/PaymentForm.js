import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import { SaveInfoButton } from "../../components";
import ApiService from "../../services/ApiService";
import PropTypes from "prop-types";

export const initialValues = {
  account_number: "",
  expiry_date: "",
  owner: "",
  is_default: false,
};

export const validate = (values) => {
  const errors = {};
  if (values.account_number.length > 16) {
    errors.account_number = "Must have less than 16 digits";
  }
  if (values.owner.length < 3) {
    errors.owner = "Must have at least 3 letters";
  }
  return errors;
};

export function PaymentForm({ afterSubmit }) {
  const formik = useFormik({
    initialValues: initialValues,
    validate: validate,
    onSubmit: (values) => {
      if (values.account_number.length < 12) {
        var errors = {
          ...formik.errors,
          account_number: "Must have at least 12 digits",
        };
        formik.setErrors(errors);
      } else {
        ApiService.createPaymentMethods(values)
          .then((data) => {
            if (typeof afterSubmit == "function") {
              afterSubmit();
            }
          })
          .catch((error) => {
            console.log("form error ", error);
          });
      }
    },
  });

  return (
    <Box sx={{ p: 2, "& .MuiFormControl-root": { m: 1 } }}>
      <form onSubmit={formik.handleSubmit}>
        <PaymentFormFields formik={formik} />

        <SaveInfoButton />
      </form>
    </Box>
  );
}

export function PaymentFormFields({ formik }) {
  function ErrorMessage({ field }) {
    return (
      formik.touched[field] &&
      typeof formik.errors[field] != "undefined" && (
        <div>{formik.errors[field]}</div>
      )
    );
  }

  return (
    <>
      <Grid item xs={12} md={12}>
        <TextField
          fullWidth
          type="text"
          name="owner"
          id="owner"
          label="Name on card"
          placeholder="Name on card"
          {...formik.getFieldProps("owner")}
          onChange={(e) => {
            let value = e.target.value;
            value = value.replace(/[^a-zA-Z' ']/g, "");
            formik.setFieldValue("owner", value);
          }}
          required
        />
        <ErrorMessage field="owner" />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          type="number"
          name="account_number"
          id="account_number"
          label="Card number"
          placeholder="Card number"
          value={formik.values.account_number}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 16)
              formik.setFieldValue("account_number", value);
          }}
          required
          helperText="Between 12 and 16 digits" //{!/((^\d{12,16}){1})$/.test(formik.values.account_number)}
          inputProps={{
            minLength: 12,
          }}
        />
        <ErrorMessage field="account_number" />
      </Grid>

      <Grid item xs={12} md={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            fullWidth
            name="expiry_date"
            id="expiry_date"
            type="date"
            label="Expiration Year and Month"
            views={["year", "month"]}
            openTo="year"
            minDate={new Date()}
            maxDate={() => {
              var newday = new Date();
              //TODO change formula
              newday.setFullYear(new Date().getFullYear() + 8);
              return newday;
            }}
            value={formik.values.expiry_date}
            onChange={(value) => {
              formik.setFieldValue("expiry_date", value);
            }}
            renderInput={(params) => <TextField {...params} />}
            required
          />
        </LocalizationProvider>
        <ErrorMessage field="expiry_date" />
      </Grid>

      <FormControlLabel
        sx={{ width: 1 }}
        control={
          <Checkbox
            name="is_default"
            id="is_default"
            {...formik.getFieldProps("is_default")}
          />
        }
        label="Make default"
      />
    </>
  );
}

PaymentForm.defaultProps = { initialValues: initialValues };
PaymentForm.propTypes = {
  formik: PropTypes.object.isRequired,
};
