import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
const TraditionSuperheros = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/superheros")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <Typography variant='h2' align='center'>
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography align='center' variant='h6'>
        {error}
      </Typography>
    );
  }

  return (
    <>
      <Typography variant='h2' align='center' gutterBottom={true}>
        Super Heros Page
      </Typography>
      {data.map((hero) => {
        return (
          <Typography variant='body1' key={hero.id}>
            {hero.name}
          </Typography>
        );
      })}
    </>
  );
};

export default TraditionSuperheros;
