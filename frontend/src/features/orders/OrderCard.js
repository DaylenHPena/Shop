import { Grid } from "@mui/material";
import { ProductCard } from "../../components";

export function OrderCard({ date,status_string,total,products }) {
  const options = { month: "short", day: "numeric", year: "numeric" };
  return (
    <Grid container spacing={2} sx={{ padding:"1rem" }}>
      <Grid container>
      <Grid xs={4}>{status_string}</Grid>
        <Grid xs={4}>
          Ordered on {new Date(date).toLocaleDateString("en-US", options)}
        </Grid>
        <Grid xs={4}>Total: ${total}</Grid>
      </Grid>
      
      <Grid container>
      {products ? (
        products.map((product) => (
          <ProductCard
            {...product}
            {...product.product}
            rightBottomComponent={
              <Grid>
                <div>Qty:{product.quantity}</div>
                <div>Paid: ${product.price}</div>
              </Grid>
            }
          />
        ))
      ) : (
        <>No orders</>
      )}</Grid>
    </Grid>
  );
}
