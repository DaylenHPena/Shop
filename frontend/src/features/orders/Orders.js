import { Grid, Typography } from "@mui/material";
import Loading from "../../components/Loading";
import { useRequest } from "../../lib/useRequest";
import ApiService from "../../services/ApiService";
import { OrderCard } from "./OrderCard";

export default function Orders() {
  const { response, error, loading, refetch } = useRequest(
    ()=> ApiService.listOrder()
  );

  return loading ? (
    <Loading />
  ) : response?.length ? (
    <Grid>
      {response.map((order) => (
        <OrderCard {...order} />
      ))}
    </Grid>
  ) : (
    <div>No Orders yet</div>
  );
}


