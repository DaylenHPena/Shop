import React, { useEffect, useMemo } from "react";
import ApiService from "../services/ApiService";
import { ItemListCard } from "../components/Item";
import Layout from "../components/Layout";
import { Pagination, Typography, Grid, Box, Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import Filter from "../components/Filter";

const categoryLabel = "category__name";

export default function ProductListPage() {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState();
  const [count, setCount] = React.useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  const itemsPerPage = 6;
  const page = () => parseInt(searchParams.get("page") || 1);
  const itemsRange = () =>
    `${page() * itemsPerPage - itemsPerPage + 1}-${page() * itemsPerPage}`;
  const totalPages = useMemo(
    () => (count > 0 ? Math.ceil(count / itemsPerPage) : 1),
    [count]
  );

  useEffect(() => {
    if (!loading) setLoading(true);
    const offset = calcOffset(page());
    doSearch(`?${searchParams.toString()}&offset=${offset}`);
    setLoading(false);
  }, [searchParams]);

  function calcOffset(page) {
    return page <= 0 ? 0 : itemsPerPage * (page - 1);
  }

  function doSearch(queryparams) {
    ApiService.retrieveList(`${queryparams}`)
      .then((data) => {
        setItems(data.results);
        if (count != data.count) {
          setCount(data.count);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleCategoryChange = (event) => {
    try {
      if (event.target.checked) {
        searchParams.append(categoryLabel, event.target.value);
      } else {
        const otherCategories = searchParams
          .getAll(categoryLabel)
          .filter((category) => category != event.target.value);
        searchParams.delete(categoryLabel);
        otherCategories.forEach((category) =>
          searchParams.append(categoryLabel, category)
        );
      }
      searchParams.set("page", 1);
      setSearchParams(searchParams, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 2,
          mb: 6,
        }}
      >
        {search ? (
          <Typography>
            {itemsRange()} of {count} results for "{search}"
          </Typography>
        ) : (
          <Typography>
            {itemsRange()} of {count} results
          </Typography>
        )}
      </Box>
      {!loading ? (
        <Grid container spacing={4}>
          <Grid item sm={2}>
            <Filter items={items} handleChange={handleCategoryChange} />
          </Grid>

          <Grid item xs={12} sm={10} md={10}>
            {items?.length ? (
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "2rem",
                }}
              >
                {items.map((item) => (
                  <ItemListCard key={item.id} item={item} />
                ))}

                <Pagination
                  sx={{ display: "flex", width: 1, justifyContent: "center" }}
                  count={totalPages}
                  onChange={(e, value) => {
                    searchParams.set("page", value);
                    setSearchParams(searchParams, { replace: true });
                  }}
                />
              </Grid>
            ) : (
              <Typography variant="h6" marginTop={3}>
                Nothing Found
              </Typography>
            )}
          </Grid>
        </Grid>
      ) : (
        <>Loading...</>
      )}
    </Layout>
  );
}
