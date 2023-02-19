import { Box, Button, Fade, Grid, Modal, Typography } from "@mui/material";
import React from "react";
import Loading from "../../components/Loading";
import { useRequest } from "../../lib/useRequest";
import ApiService from "../../services/ApiService";
import AddressCard from "./AddressCard";
import { AddressForm } from "./AddressForm";

export default function Address() {
  const { response, error, loading, refetch } = useRequest(() =>
    ApiService.listAddresses()
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = () => {
    handleClose();
    refetch(Math.random());
  };

  const onDelete = () => {
    refetch(Math.random());
  };

  return (
    <div>
      {loading ? (
        <Loading text="Loading addresses" />
      ) : error ? (
        <div>Error</div>
      ) : response ? (
        <>
          <Button onClick={handleOpen}>Add a new address </Button>
          <Grid container spacing={2} justifyContent="center">
            {response.map((address) => (
              <Grid item xs={5} key={address.id}>
                <AddressCard
                  {...address}
                  onDelete={onDelete}
                />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography>No addresses added</Typography>
      )}
      <>
        <Modal open={open} onClose={handleClose}>
          <Fade in={open}>
            <Box className="modal-body">
              <Typography variant="inherit" align="center">
                Add a new address
              </Typography>
              <AddressForm afterSubmit={onSubmit} />
            </Box>
          </Fade>
        </Modal>
      </>
    </div>
  );
}
