import React from "react";
import { Layout, Loading } from "../components";
import { useRequest } from "../lib/useRequest";
import ApiService from "../services/ApiService";
import { OrderCard } from "../features/orders";
import { Typography } from "@mui/material";

export default function OrderFinishedPage() {
  const { response, error, loading, refetch } = useRequest(() =>
    ApiService.retrieveLastOrder()
  );
  console.log("response", response);
  return (
    <Layout>
      <Typography variant="h5" marginBottom="4rem">Congrats! Your order was placed</Typography>
      {loading ? (
        <Loading text="Loading addresses" />
      ) : error ? (
        <div>We couldn't get your data. Please, try again</div>
      ) : response ? (
        <OrderCard {...response} />
      ) : null}
    </Layout>
  );
}

function RequestLayout({ error, loading, children }) {
  return (
    <div>
      {loading ? (
        <Loading text="Loading addresses" />
      ) : error ? (
        <div>We couldn't get your data. Please, try again</div>
      ) : null}
      {children}
    </div>
  );
}
