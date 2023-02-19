import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useRequest } from "../../lib/useRequest";
import ApiService from "../../services/ApiService";
import PaymentCard from "./PaymentCard";

export default function PaymentOrDefaultItem({ id }) {
  console.log('typeof id == "undefined"', typeof id, "id", id);
  const { response, error, loading, refetch } = useRequest(() =>
    typeof id == "undefined"
      ? ApiService.retrievePaymentDefault()
      : ApiService.retrievePaymentMethods(id)
  );

  useEffect(() => {
    //random to force refetch
    refetch(Math.random());
  }, [id]);

  return response ? (
    <PaymentCard {...response} />
  ) : (
    <Typography>Non established</Typography>
  );
}
