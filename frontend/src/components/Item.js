import {
  alpha,
  Card,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const ItemTag = styled("span")(({ theme }) => ({
  position: "absolute",
  top: "6px",
  left: "10px",
  letterSpacing: ".2em",
  textTransform: "uppercase",
  margin: "4px 0",
  padding: "2px 6px",
  backgroundColor: "white",
}));

export function ItemListCard({ item }) {
  return item ? (
    <Link to={`/product/${item.id}/`}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: 0,
          backgroundColor: "white",
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          sx={{ height: {md:"calc(60vw / 3)",xs:1}, width: {md:"calc(60vw / 3)",xs:1}}}
          image={item.image ? item.image : "https://source.unsplash.com/random"}
          alt="random"
        />
        {item.inventory == 0 && <ItemTag>Sold out</ItemTag>}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="inherit"
            sx={{ textTransform: "uppercase", letterSpacing: "0.2em" }}
          >
            {item.name}
          </Typography>
          <Typography>${item.price}</Typography>
        </CardContent>
      </Card>
    </Link>
  ) : (
    <>Nothinf</>
  );
}

export function ItemList({ items }) {
  return items ? (
    items.map((item) => <ItemListCard key={item.id} item={item} />)
  ) : (
    <Typography variant="h2">No items...</Typography>
  );
}
