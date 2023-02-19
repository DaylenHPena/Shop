import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useRequest } from "../../lib/useRequest";
import ApiService from "../../services/ApiService";
import AddressCard from "./AddressCard";

export default function AddressOrDefaultItem({ id, onChange }) {
  const { response, error, loading, refetch } = useRequest(() =>
    typeof id == "undefined"
      ? ApiService.retrieveAddressDefault()
      : ApiService.retrieveAddress(id)
  );

  useEffect(() => {
    //random to force refetch
    refetch(Math.random());
  }, [id]);

  return response ? (
    <AddressCard {...response} />
  ) : (
    <Typography>None established</Typography>
  );
}
