import {
  Box,
  Button, Divider,
  Grid,
  Typography
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import LastSeen from "../features/lastSeen/LastSeen";
import "./IndexPage.css";

export default function IndexPage() {
  const navigate = useNavigate();
  const categories = [
    {
      cat: "clothing",
      url: "https://images.unsplash.com/photo-1522163733688-ced527e6031b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
    {
      cat: "alcohol",
      url: "https://images.unsplash.com/photo-1626834918451-3f09c7659c7c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
    {
      cat: "decor",
      url: "https://img.freepik.com/free-photo/beautiful-ikebana-arrangement-with-sakura_23-2149483980.jpg?w=740&t=st=1674469307~exp=1674469907~hmac=0f639bc1ce27213c358cb89e8a0bb5a66a833007b8ff0c48d5f22b5903a10d6e",
    },
    {
      cat: "lamps",
      url: "https://images.unsplash.com/photo-1646789263188-e1f823dc4000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      cat: "shoes",
      url: "https://images.unsplash.com/photo-1622365967891-e580e0fdfd9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  const Cover = () => {
    return (
      <Box
        height="30vh"
        display="flex"
        flexDirection="column"
        sx={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534214526114-0ea4d47b04f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Typography
          variant="h1"
          color="white"
          sx={{ position: "relative", top: "50%" }}
        >
          Japan to your door
        </Typography>
      </Box>
    );
  };

  return (
    <Layout main={<Cover />}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        marginBottom={5}
        sx={{ gap: 3 }}
      >
        {categories.map((item) => (
          <Grid
            className="gallerie"
            item
            key={item.cat}
            sx={{
              overflow: "hidden",
              width: { xs: "80%", sm: "35%" },
              height: { xs: "80vw", sm: "35vw" },
              backgroundImage: `url(${item.url})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              marginTop: "2rem",
              padding:"0 !important",
            }}
          >
            <Typography
              variant="h4"
              sx={{ position: "relative", top: "50%", color: "white",textTransform:"uppercase" }}
            >
              {item.cat}
            </Typography>

           

            <div class="grid__overlay">
              <div></div>
              <Button
              variant="outlined"
              size="large"
              color="info"
            
              onClick={() => {
                navigate(`/sale?category__name=${item.cat}&page=1`);
              }}
            >
              Shop...
            </Button>
              <div></div>
            </div>
          </Grid>
        ))}
      </Grid>
      <Divider />
      <LastSeen />
    </Layout>
  );
}
