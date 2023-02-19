import { Grid } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ActionButton,
  Layout,
  ProductCard,
  TotalInfoCard,
} from "../components";
import {
  calcAmmount,
  emptyCart,
  emptyCartAsync,
  selectCart,
  totalItems,
} from "../features/cart/cartSlice";
import { CompleteForm, Selectors } from "../features/checkout";
import ApiService from "../services/ApiService";

export default function CheckoutPage() {
  const items = useSelector(selectCart);
  const [form, setForm] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const components = {
    completeForm: CompleteForm,
    selectors: Selectors,
  };

  const afterSubmit = () => {
    dispatch(emptyCartAsync())
    navigate("/last-order/");
  };

  const TotalCard = () => (
    <TotalInfoCard
      total={total}
      quantity={quantity}
      actionButton={<ActionButton type="submit">Pay now</ActionButton>}
    />
  );

  const Form = () => {
    if (!form) return null;
    if (typeof components[form] !== "undefined") {
      return React.createElement(components[form], {
        items: items,
        children: <TotalCard />,
        afterSubmit: afterSubmit,
      });
    }
  };

  const total = useMemo(
    () => (items ? items.reduce(calcAmmount, 0) : 0),
    [items]
  );
  const quantity = useMemo(() => totalItems(items), [items]);
  const canCheckout = () => Number(total) > 0;

  useEffect(() => {
    if (items?.length) {
      ApiService.retrieveAddressDefault()
        .then(() =>
          ApiService.retrievePaymentDefault().then(() => {
            setForm("selectors");
          })
        )
        .catch(() => {
          setForm("completeForm");
        });
    }
    return () => {};
  }, [items]);

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          CheckoutPage
        </Grid>

        <Form />

        <Grid container spacing={2}>
          {items ? (
            items.map((item) => <ProductCard key={item.id} {...item.product} rightBottomComponent={
              <Grid item>                
                qty {item.quantity}
            </Grid>
            }
            />)
          ) : (
            <>Nothing to checkout</>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
}
