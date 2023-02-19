import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import { ProductCard } from "../../components";
import ApiService from "../../services/ApiService";

function WishlistItem({ product, afterRemove }) {
  const removeItem = () => {
    ApiService.removeWishlist(product.id).then(afterRemove(product.id));
  };

  const ExtraInfo = ({ product }) => (
    <Grid container flexDirection="column">
      <Tooltip title="Delete">
        <Button onClick={removeItem}>
          <DeleteForeverIcon />
        </Button>
      </Tooltip>
      <Typography variant="body2" gutterBottom>
        {product.liked_by} people likes this
      </Typography>
    </Grid>
  );

  return product ? (
    <ProductCard
      {...product}
      rightBottomComponent={<ExtraInfo product={product} />}
    />
  ) : null;
}

export default WishlistItem;
