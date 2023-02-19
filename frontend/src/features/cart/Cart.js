import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Box,
  Button,
  Fade,
  Grid,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ActionButton, ProductCard, TotalInfoCard } from "../../components";
import { LINKS } from "../../const";
import ApiService from "../../services/ApiService";
import LastSeen from "../lastSeen/LastSeen";
import {
  calcAmmount,
  removeItemAsync,
  selectCart,
  selectCartExpired,
  totalItems,
  increaseQty,
  decreaseQty,
} from "./cartSlice";

export default function Cart() {
  const cart = useSelector(selectCart);
  const cartExpired = useSelector(selectCartExpired);
  const total = useMemo(() => (cart ? cart.reduce(calcAmmount, 0) : 0), [cart]);
  const quantity = useMemo(() => totalItems(cart), [cart]);
  const canCheckout = () => Number(total) > 0;
  console.log("cart :>> ", cart);
  return (
    <Grid container spacing={2}>
      <Typography variant="h5" gutterBottom textAlign="left">
        Shopping Cart
        {cart?.length > 0
          ? ` (${cart.length} product${cart.length == 1 ? "" : "s"})`
          : null}
      </Typography>
      {cart?.length > 0 ? (
        <Grid container spacing={2} sx={{ marginTop: "3rem" }}>
          <Grid item xs={12} sm={9}>
            <Grid item></Grid>
            <Grid item>
              <Grid container spacing={3}>
                {cart?.map((item) => (
                  <Grid item key={item.id} xs={12} sm={12} md={12}>
                    <CartItem item={item} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            {cartExpired?.length ? (
              <Grid item mt={4}>
                <Typography variant="h5">Sold out Items</Typography>
                <p>Some items in your cart are not available for purchase</p>
                {cartExpired?.map((item) => (
                  <Grid item key={item.id} xs={12} sm={12} md={12}>
                    <CartItemExpired item={item} />
                  </Grid>
                ))}
              </Grid>
            ) : null}
          </Grid>

          <Grid item xs={12} sm={3}>
            <TotalInfoCard
              total={total}
              quantity={quantity}
              actionButton={
                <Link to={canCheckout ? LINKS.CHECKOUT : ""}>
                  <ActionButton>Checkout</ActionButton>
                </Link>
              }
            />
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid container spacing={2} marginX={2} sx={{ marginTop: "2rem", minHeight:"35vh" }} >
            <Typography variant="h6" >
              Your cart is empty. Keep shopping for more amazing products!
            </Typography>
          </Grid>
          <Grid container spacing={2} marginX={2} sx={{ marginTop: "2rem" }} justifyContent="center">
            <LastSeen />
          </Grid>
        </>
      )}
    </Grid>
  );
}

function CartItemExpired({ item }) {
  const { product, quantity, id } = item || {};
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  return product ? (
    <>
      <ProductCard
        {...item.product}
        rightBottomComponent={
          <Grid item>
            <Button onClick={handleOpen} size="small">
              <DeleteForeverIcon fontSize="small" />
            </Button>
          </Grid>
        }
      />

      <Modal open={open} onClose={handleClose}>
        <Fade in={open}>
          <Box className="modal-body">
            <Typography variant="h5">Remove item from cart?</Typography>
            <Button
              variant="contained"
              size="medium"
              color="error"
              onClick={() => {
                dispatch(removeItemAsync(id));
              }}
            >
              Remove
            </Button>
            <Button variant="outlined" size="medium">
              Cancel
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  ) : (
    <>Nothing</>
  );
}

function CartItem({ item }) {
  const { product, quantity, id } = item || {};
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const total = useMemo(
    () =>
      item
        ? (parseFloat(quantity) * parseFloat(item.product.price)).toFixed(2)
        : 0,
    [quantity]
  );

  return product ? (
    <>
      <ProductCard
        {...item.product}
        rightBottomComponent={
          <Grid item>
            <Typography variant="body2" gutterBottom>
              <Button
                size="small"
                onClick={() => {
                  if (quantity > 1)
                    dispatch(decreaseQty({ product: product.id }));
                }}
              >
                -
              </Button>
              qty {quantity}
              <Button
                size="small"
                onClick={() => {
                  if (quantity < product.inventory)
                    dispatch(increaseQty({ product: product.id }));
                }}
              >
                +
              </Button>
            </Typography>
            <Typography variant="body2" gutterBottom>
              Total:${total}
            </Typography>
            <Tooltip title="Move to wishlist">
              <Button
                size="small"
                onClick={() => {
                  ApiService.addWishlist(product.id).then(() => {
                    dispatch(removeItemAsync(id));
                  });
                }}
              >
                <FavoriteIcon fontSize="small" />
              </Button>
            </Tooltip>
            <Tooltip title="Delete">
              <Button onClick={handleOpen} size="small">
                <DeleteForeverIcon fontSize="small" />
              </Button>
            </Tooltip>
          </Grid>
        }
      />

      <Modal open={open} onClose={handleClose}>
        <Fade in={open}>
          <Box className="modal-body">
            <Typography variant="h5">Remove item from cart?</Typography>
            <Button
              variant="contained"
              size="medium"
              color="error"
              onClick={() => {
                dispatch(removeItemAsync(id));
              }}
            >
              Remove
            </Button>
            <Button variant="outlined" size="medium">
              Cancel
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  ) : (
    <>Nothing</>
  );
}
