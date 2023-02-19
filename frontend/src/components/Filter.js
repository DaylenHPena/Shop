import {
  Checkbox, FormControlLabel, FormGroup, Grid
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

export default function Filter({ type, items, handleChange, ...restProps }) {
  const categories = [
    ...new Map(
      items?.map((item) => [item.category.id, item.category])
    ).values(),
  ];
  return (
    <Grid container sx={{backgroundColor:"white",padding:2}}>
      <Grid item xs={12}>
        Filter
      </Grid>
      <Grid item xs={12}>
        <FormGroup>
          {categories
            ? categories?.map((category) => (
                <FormControlLabel
                  key={category.id}
                  control={<Checkbox />}
                  label={category.name}
                  value={category.name}
                  onChange={handleChange}
                />
              ))
            : null}
        </FormGroup>
      </Grid>
    </Grid>
  );
}

Filter.propTypes = { items: PropTypes.array };
