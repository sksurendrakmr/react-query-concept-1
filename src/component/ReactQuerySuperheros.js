import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Typography } from "@mui/material";
/**
 *  we use useQuery hook for all our data fetching needs.
 * useQuery hook requires atleast two arguments.
 * 1) unique key to identify this query
 * 2)accepts a function that returns a promise.
 *
 * With react query, we don't have to manage react state based on the effect.
 */

const fetchSuperheros = () => {
  return axios.get("http://localhost:4000/superheros");
};
const ReactQuerySuperheros = () => {
  const { isLoading, data } = useQuery("super-heros", fetchSuperheros);

  if (isLoading) {
    return (
      <Typography variant='h2' align='center'>
        Loading...
      </Typography>
    );
  }
  return (
    <>
      <Typography variant='h2' align='center' gutterBottom={true}>
        React Query Superheros
      </Typography>
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
