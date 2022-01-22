import { useQuery, useMutation } from "react-query";
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

/**
 * This function is going to accept the hero details that we pass in
 * from our component.
 *
 * within the function, we make axios post request and return the result
 */
const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheros", hero);
};
export const useAddSuperHeroData = () => {
  /**
   * useMutation unlike useQuery doesn't necessarily
   * need a key.
   *
   * The first argument is the function which will post data
   * to the backend.
   *
   * Similar to the fetcher function we had written for useQuery,
   * we need to define a mutation function.
   */
  return useMutation(addSuperHero);
};
