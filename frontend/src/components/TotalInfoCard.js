import { Grid, Paper } from "@mui/material";
import PropTypes from "prop-types";

function TotalInfoCard({ total, quantity, table, actionButton }) {
  return (
    <Paper
      align={"left"}
      sx={{
        p: 2,
        fontSize: "1.3rem",
        border:"1px solid #c0bfc4",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
      elevation={0}
    >
      <Grid container spacing={1} marginBottom={2}>
        <Grid item xs={6} md={6}>
          Items:
        </Grid>
        <Grid item xs={6} md={6} textAlign="right">
          {quantity}
        </Grid>
        {table.map((items) => (
          <>
            <Grid item xs={6} md={6}>
              {items[0]}
            </Grid>
            <Grid item xs={6} md={6} textAlign="right">
              {items[1]}
            </Grid>
          </>
        ))}
        <Grid item xs={6} md={6}>
          Your Total:
        </Grid>
        <Grid item xs={6} md={6} textAlign="right">
          ${total}
        </Grid>
      </Grid>
      {actionButton}
    </Paper>
  );
}

TotalInfoCard.propTypes = {
  total: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  actionButton: PropTypes.element.isRequired,
  table: PropTypes.array,
};

TotalInfoCard.defaultProps = {
  table: [],
};

export default TotalInfoCard;
