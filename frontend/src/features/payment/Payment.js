import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { Loading, Modal } from "../../components";
import { useRequest } from "../../lib/useRequest";
import ApiService from "../../services/ApiService";
import PaymentCard from "./PaymentCard";
import { PaymentForm } from "./PaymentForm";

export default function Payment() {
  const { response, error, loading, refetch } = useRequest(
    ()=>ApiService.listPaymentMethods()
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = () => {
    handleClose();
    refetch();
  };

  const onDelete = () => {
    refetch(Math.random());
  };

  return (
    <>
      <Grid item xs={12}>

        <Button onClick={handleOpen} component="div">
          Add a new card
        </Button>
        <Modal title="Add a new card" open={open} handleClose={handleClose}>
          <PaymentForm afterSubmit={onSubmit} />
        </Modal>
      </Grid>

      <Grid
        container
        spacing={2}
        justifyContent="center"
      >
        {loading ? (
          <Loading text="Loading payment methods" />
        ) : response ? (
          response.map((card) => (
            <Grid item key={card.id}  xs={4}>
              <PaymentCard {...card} onDelete={onDelete} />
            </Grid>
          ))
        ) : (
          <Typography>No cards added</Typography>
        )}
      </Grid>
    </>
  );
}
