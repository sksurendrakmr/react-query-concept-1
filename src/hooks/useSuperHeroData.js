import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { findDOMNode } from "react-dom";

// const fetchSuperHero = (heroId) => {
//   return axios.get(`http://localhost:4000/superheros/${heroId}`);
// };

/**
 * ?The function recieves various values of which we destructure querykey.
 * !querykey is an array which mimics the array which mimics the array we have passed in to useQuery
 */
const fetchSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheros/${heroId}`);
};
export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient();
  /**
   * *we need the superhero id in this function.
   * !In useQuery, the first argument is a key to uniquely identify this query.
   * ?As this queryId dependent of heroId as well, so in order to have different unique id for different heroid
   * ?we have to include the hero id as part of the query key by specifying an array.
   * !By doing so, react query now maintain separate queries for each hero.
   *
   * *In first statement, we are manually passing heroId in fetcher function.
   * *Well it turns out react query automatically passes them in fetcher function.
   */
  //   return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId));
  return useQuery(["super-hero", heroId], fetchSuperHero, {
    initialData: () => {
      /**
       within this function we first need to get the hero from the 
       hero list corresponding to the heroId parameter.

       For that, we need to call getQueryData() in queryClient and 
       pass the query key of super heros list query.
       *  */
      const hero = queryClient
        .getQueryData("super-heros")
        ?.data?.find((hero) => hero.id === parseInt(heroId));

      if (hero) {
        return {
          data: hero,
        };
      } else {
        return undefined;
      }
    },
    /**
     * If initalData return undefined then the react query set that query to a
     * hard loading state thus saving us from a runtime error.
     */
  });
};
