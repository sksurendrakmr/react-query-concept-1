import { useSuperHeroData } from "../hooks/useSuperHeroData";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
export const RQSuperHeroPage = () => {
  const { heroId } = useParams();
  const { data, isLoading, isError, error } = useSuperHeroData(heroId);

  if (isLoading) {
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
      <h1>Super Hero Details</h1>
      <Typography style={{ marginTop: "1rem" }}>
        {data?.data.name} - {data?.data.alterEgo}
      </Typography>
    </>
  );
};
