import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheros");
};

export const useSuperHerosData = (onSuccess, onError) => {
  /**
   *!This hook is simply a wrapper around the useQuery hook.
   */
  return useQuery("super-heros", fetchSuperHeros, {
    onSuccess,
    onError,
  });
};
