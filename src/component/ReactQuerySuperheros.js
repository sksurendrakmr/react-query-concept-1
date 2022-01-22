import React, { useState } from "react";
import axios from "axios";
import { Button, Typography, Grid } from "@mui/material";
import {
  useAddSuperHeroData,
  useSuperHerosData,
} from "../hooks/useSuperHerosData";

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
 *
 * After creating the forms, we have to call an api that accepts heroname
 * and alterEgo and save the data into db.json
 *
 * For create, update and delete data, we use mutations.
 * For this purpose, similar to useQuery hook, the library provides
 * a useMutation hook.
 *
 * We have created a custom mutation hook to post the data.
 * How do we call this hook and post data from our this component??
 * 1) Import and invoke custom hook.
 */
const fetchSuperheros = () => {
  return axios.get("http://localhost:4000/superheros");
};
const ReactQuerySuperheros = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");
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

  //mutate -> a function that we have to call to make the post request.
  const {
    mutate: addHeroMutate,
    isError: isAddHeroError,
    isLoading: isAddHeroLoading,
    error: addHeroError,
  } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    console.log({ name, alterEgo });

    const hero = { name, alterEgo };
    addHeroMutate(hero);
  };
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
      <div>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add heros</button>
      </div>
      <Button onClick={refetch}>Fetch Superheros</Button>
      <Grid container direction='column'>
        {data?.data.map((hero) => {
          return (
            <Grid item key={hero.id}>
              <Typography
                variant='body1'
                component={Link}
                to={`/rq/${hero.id}`}
              >
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
