import { Box, CardMedia, Grid, Link, styled, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectLastSeen } from "./lastSeenSlice";

export const SmallImageWrapper = styled("div")(
  ({ theme, image, ...otherProps }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    margin: "auto",
    width: `calc(100vw / 7)`,
    height: "200px",
    aspectRatio: 1,
    [theme.breakpoints.down("sm")]: {
      width: `calc(100vw / 7)`,
      height: "200px",
    },
    ...otherProps,
  })
);

export default function LastSeen() {
  const lastSeen = useSelector(selectLastSeen);
  return (
    <Box spacing={1} marginBottom={2}>
      <Typography gutterBottom variant="h6">
        Your last seen
      </Typography>
      {lastSeen ? (
        <Grid
          container
          display="flex"
          wrap={false}
          //overflow="hidden"
          height="200px"
          justifyContent="center"
          gap={2}
        >
          {lastSeen.map((item) => (
              <LastSeenItem  item={item} key={item.id} />
          ))}
        </Grid>
      ) : null}
    </Box>
  );
}

function LastSeenItem({ item }) {
  return (
    <Link to={`/product/${item.id}`}>
      <SmallImageWrapper
        image={item.image || "https://source.unsplash.com/random"}
        alt={item.title}
        loading="lazy"
      />
    </Link>
  );
}
