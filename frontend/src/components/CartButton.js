import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveCartAsync, selectCart } from "../features/cart/cartSlice";

export default function CartButton(props) {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart == null) {
      dispatch(retrieveCartAsync());
    }
    return () => {};
  }, []);

  return (
    <IconButton size="large" aria-label="cart" color="inherit" {...props}>
      <Badge badgeContent={cart?.length} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
}
