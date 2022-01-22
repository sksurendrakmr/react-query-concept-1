import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Button, Grid, Typography } from "@mui/material";

/**
 * Steps
 * 1) We need to maintain a state variable for the page number.
 *    since, initial value in state is 1, so we will viewing the
 *    first page by default.
 *
 * 2) We utilize this page number to create unique queries
 * 3) Add next and previous buttons that change the page number
 *
 * Currently the UI jumps in and out of the success and loading state
 * because each new page is treated like a brand new query.
 *
 * To overcome this, react query provides an option called keepPreviousData
 *
 * We need to set keepPreviousData to true
 * Then react query will maintain the data from the last successful fetch
 * while the new data is being requested even though the query key has changed.
 *
 * And when the new data is arrived, the previous data is seamlessly
 * swapped to show the new data.
 *
 * In this case, We can use isFetching Flag to show a loading indicator if we wish.
 */

const fetchColors = ({ queryKey }) => {
  const pageNumber = queryKey[1];
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

export const PaginatedQueries = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, data, error, isError, isFetching } = useQuery(
    ["colors", pageNumber],
    fetchColors,
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <Typography variant='h2'>Loading ...</Typography>;
  }

  if (isError) {
    return <Typography variant='h2'>{error.message}</Typography>;
  }

  return (
    <>
      <Grid container direction='column'>
        {data?.data.map((color) => {
          return (
            <Grid item key={color.id}>
              <Typography variant='body1'>
                {color.id} - {color.label}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
      <Grid container spacing={2}>
        <Grid item>
          <Button
            variant='contained'
            onClick={() => setPageNumber((page) => page - 1)}
            disabled={pageNumber === 1}
          >
            Prev page
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            onClick={() => setPageNumber((page) => page + 1)}
            disabled={pageNumber === 4}
          >
            Next page
          </Button>
        </Grid>
      </Grid>
      {isFetching && "Loading"}
    </>
  );
};
