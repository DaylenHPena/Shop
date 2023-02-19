import { Grid, Typography, CardMedia, Paper, ButtonBase } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ProductCard({
  id,
  name,
  image,
  price,
  rightBottomComponent,
}) {
  const picSize = {
    xs: "calc(25vw - 14px);",
    sm: 120,
    md: 120,
    lg: 120,
  };

  return id ? (
    <>
      <Paper
      elevation={0}
        sx={{
          p: 2,
          margin: "auto",
          width: 1,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={3}>
                <Link to={`/product/${id}`}>
                  <ButtonBase sx={{ width: picSize, height: picSize }}>
                    <CardMedia
                      component="img"
                      sx={{ width: picSize, height: picSize }}
                      image={
                        image ? image : "https://source.unsplash.com/random"
                      }
                      alt="image"
                    />
                  </ButtonBase>
                </Link>
              </Grid>
              <Grid item xs={12} sm={9} md={9} alignContent="flex-start">
                <Typography
                  gutterBottom
                  variant="inherit"
                  component="div"
                  align="left"
                >
                  {name}
                </Typography>
                <Typography variant="h6" component="div" align="left">
                  ${price}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={4} display="flex" alignItems="center">
            {rightBottomComponent ? rightBottomComponent : null}
          </Grid>
        </Grid>
      </Paper>
    </>
  ) : null;
}
ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  rightBottomComponent: PropTypes.element,
};
