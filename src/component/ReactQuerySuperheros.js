import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Button, Typography } from "@mui/material";
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
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heros",
    fetchSuperheros,
    { enabled: false }
  );

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
      {data?.data.map((hero) => {
        return (
          <Typography key={hero.id} variant='body1'>
            {hero.name}
          </Typography>
        );
      })}
    </>
  );
};

export default ReactQuerySuperheros;
