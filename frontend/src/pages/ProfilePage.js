import { Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { AccountNavbar, Layout } from "../components";
import {Address} from "../features/address";
import {Orders} from "../features/orders";
import {Payment} from "../features/payment";
import { Profile } from "../features/user";

export default function ProfilePage() {
  const [section, setSection] = useState("profile");
  const listItems = {
    profile: { type: Profile },
    orders: { type: Orders },
    addresses: { type: Address },
    payment: { type: Payment },
  };

  const handleClick = (e) => {
    const value = e.target.innerHTML.toLowerCase();
    if (Object.keys(listItems).find((item) => item == value)) {
      setSection(value);
    }
  };

  const Header = () => {
    return section.toUpperCase();
  };

  const Section = () => {
    const Item = listItems[section]?.type;
    return typeof Item != "undefined" ? <Item /> : null;
  };

  return (
    <Layout>
      <Grid container spacing={5}>
        <Grid item xs={3}>
          <Paper elevation={0} sx={{backgroundColor:"white"}}>
          <Typography variant="h6" marginBottom={4} paddingTop={2}>ACCOUNT</Typography>
            <AccountNavbar
              items={Object.keys(listItems)}
              onClick={handleClick}
            />
          </Paper>
        </Grid>
        <Grid item xs={9}>
        <Paper elevation={0} sx={{backgroundColor:"transparent",minHeight:"60vh"}}>
          <Typography variant="h6" marginBottom={4} paddingTop={2}><Header /></Typography>
          {<Section />}
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}
