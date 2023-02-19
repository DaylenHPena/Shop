import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { addToCart } from "../features/cart/cartSlice";
import LastSeen from "../features/lastSeen/LastSeen";
import { addLastSeen } from "../features/lastSeen/lastSeenSlice";
import ApiService from "../services/ApiService";
import { ImageWrapper } from "../components";

export default function ProductDetailPage(params) {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    ApiService.retrieveDetails(id).then((data) => {
      setProduct(data);
      dispatch(addLastSeen(data));
    });
  }, []);

  const handleQtyChange = (e) => setQuantity(Number(e.target.value));
  const icrement = () => (quantity - 1 > 0 ? setQuantity(quantity - 1) : null);
  const decrement = () =>
    quantity + 1 <= product.inventory ? setQuantity(quantity + 1) : null;
  const addCart = () => {
    dispatch(addToCart({ product: product.id, quantity: quantity }));
  };

  return (
    <Layout>
      {product ? (
        <ItemDetailCard
          item={product}
          quantity={quantity}
          icrement={icrement}
          decrement={decrement}
          addCart={addCart}
          handleChange={handleQtyChange}
        />
      ) : (
        <>Loading</>
      )}
      <Divider />
      <LastSeen />
    </Layout>
  );
}

function ItemDetailCard({ item, quantity, addCart, handleChange }) {
  return (
    <Grid
      container
      spacing={2}
      marginTop={2}
      flexDirection="row"
      alignItems="flex-start"
      width={1}
      margin="auto"
      minHeight="80vh"
      alignContent="flex-start"
      marginBottom={4}
    >
      <ImageWrapper
        image={item?.image ? item.image : "https://source.unsplash.com/random"}
      />

      <Grid container paddingLeft={2} paddingRight={2} sm={12} md={5}>
        <Grid container>
          <Typography
            variant="h4"
            align="left"
            gutterBottom
            textTransform="uppercase"
          >
            {item?.name}
          </Typography>
          <Box flexGrow={1} />
          <WishlistButton
            id={item?.id}
            selected={item?.wished}
            likes={item?.liked_by}
          />
        </Grid>
        <Typography gutterBottom variant="h6" align="left" width={1}>
          ${item?.price}
        </Typography>
        {item?.inventory < 100 && item?.inventory > 0 && (
          <Typography gutterBottom variant="h6" align="left" width={1}>
            Only {item?.inventory} left
          </Typography>
        )}
        {item?.inventory == 0 && (
          <Typography gutterBottom variant="h6" align="left" width={1}>
            Sold Out
          </Typography>
        )}

        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          align="left"
          marginBottom={4}
          marginTop={4}
        >
          <Select
            labelId="Qty"
            id="Qty"
            label="Qty"
            value={quantity}
            onChange={handleChange}
            sx={{ height: 40 }}
          >
            {Array.from("123456789").map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            disabled={item?.inventory == 0}
            onClick={addCart}
            sx={{ flexGrow: 1, marginLeft: 2, height: 1 }}
          >
            Add to Cart
          </Button>
        </Grid>

        <Divider fullWidth />
        <Typography variant="body1" align="justify">
          {item.desc}
        </Typography>
      </Grid>
    </Grid>
  );
}

function WishlistButton({ id, selected, likes }) {
  const [wished, setWished] = useState(selected);
  const [count, setCount] = useState(likes);

  function handleClick(e) {
    if (wished) {
      ApiService.removeWishlist(id).then(() => {
        setWished(false);
        setCount(count - 1);
      });
    } else {
      ApiService.addWishlist(id).then(() => {
        setWished(true);
        setCount(count + 1);
      });
    }
  }

  return (
    <Button variant="text" onClick={handleClick}>
      {wished ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />} {count || 0}
    </Button>
  );
}
