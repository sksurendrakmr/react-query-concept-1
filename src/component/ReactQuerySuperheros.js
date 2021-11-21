import React from "react";
import axios from "axios";
import { Button, Typography, Grid } from "@mui/material";
import { useSuperHerosData } from "../hooks/useSuperHerosData";

import { Link } from "react-router-dom";
/**
 *  we use useQuery hook for all our data fetching needs.
 * useQuery hook requires atleast two arguments.
 * 1) unique key to identify this query (similar to how we would have unique id for every row in a database)
 * 2)accepts a function that returns a promise.
 *
 * With react query, we don't have to manage react state based on the effect.
 */

/**
 * 4- Handle query error
 * isError => a flag
 * error => error thrown from the request
 *
 * react query automatically retries if the API request failed
 */
const fetchSuperheros = () => {
  return axios.get("http://localhost:4000/superheros");
};
const ReactQuerySuperheros = () => {
  const onSuccess = (data) => {
    //this function will be called when the query successfully fetches data
    console.log("Perform side effect after data fetching", data);
  };

  const onError = (error) => {
    //this function get called when the query encounters an error while trying to fetch the data.
    console.log("Perform side effect after encountering error", error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHerosData(onSuccess, onError);

  if (isLoading || isFetching) {
    return (
      <Typography variant='h2' align='center'>
        Loading...
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography align='center' variant='h6'>
        {error.message}
      </Typography>
    );
  }
  return (
    <>
      <Typography variant='h2' align='center' gutterBottom={true}>
        React Query Superheros
      </Typography>
      <Button onClick={refetch}>Fetch Superheros</Button>
      <Grid container direction='column'>
        {data?.data.map((hero) => {
          return (
            <Grid item>
              <Typography
                key={hero.id}
                variant='body1'
                component={Link}
                to={`/rq/${hero.id}`}>
                {hero.id} - {hero.name}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default ReactQuerySuperheros;
