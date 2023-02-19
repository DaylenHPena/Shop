import React from "react";
import Layout from "../components/Layout";
import ApiService from "../services/ApiService";
import { Container, Grid, Typography } from "@mui/material";
import WishlistItem from "../features/wishlist/Wishlist";
import { Loading } from "../components";

export default function WishlistPage() {
  //not using useRequest as I dont wanna have to refetch when  an item is deleted
  const [items, setItems] = React.useState();
  React.useEffect(() => {
    ApiService.retrieveWishlist().then((data) => {
      setItems(data);
    });
  }, []);

  const afterRemove = (id) => {
    if (items) {
      setItems(items.filter((item) => item.id != id));
    }
  };

  return (
    <Layout>
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <Typography variant="h5">Wishlist</Typography>
          <Grid item>
            <Container sx={{ py: 8 }} maxWidth="md">
              {items ? (
                <>
                  <Typography>
                    {items.length} item{items.length > 1 ? "s" : null}
                  </Typography>
                  <Grid container spacing={1}>
                    {items.map((item) => (
                      <Grid item key={item.id} xs={12} sm={12} md={12}>
                        <WishlistItem
                          product={item}
                          afterRemove={afterRemove}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </>
              ) : (
                <Loading text="Loading" />
              )}
            </Container>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
