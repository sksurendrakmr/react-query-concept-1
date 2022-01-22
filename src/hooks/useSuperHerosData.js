import { useQuery, useMutation, useQueryClient } from "react-query";
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

  /**
   * onMutate is called before the mutation function is fired and is passed
   * the same variables the mutation function would receive.
   * In our case, it is the new hero we want to add.
   *
   * 1)Within the function, the first thing we want to do is cancel any outgoing refetches
   * so they don't overwrite our optimistic update.
   * The way to do that is using the cancelQueries method on the queryClient instance.
   * In our case, we want to cancel super-heros queries.
   * But this needs to be awaited.
   *
   * 2) we need to get hold of the current query data before we make any update.
   * This will help us roll back in case the mutation fails.
   *
   * To get hold of the current query data we use the getQuery method on the
   * queryClient instance.
   *
   * Now we are all set to update the query data
   * we can do that using setQueryData method
   *
   * This way, we have been updated our list of heros before making
   * the post request
   *
   * From this onMutate function, we will return an object with a
   * key value set to previous hero data.
   * This will be used to roll back data in case the mutation errors out.
   *
   * 3) Defining onError callback
   * This mutation is called if the mutation encounters an error.
   * The function receives three arguments : -
   * 1) The error that was encountered
   * 2) The variable passed into the mutation which would be hero name and alterEgo
   * 3) context -> contains additional information pertaining to the mutation.
   *    It is on this object we can access previous hero data that we have
   *    returned from onMutate callback and set it as the query data when ther is an error
   *
   *
   * 4th step
   *Defining the onSettle callback
   This mutation is called if the mutation is either successful or when it
   encounters an error.
   In this function all we have to do is refetch the superheros
   */
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heros");
      const previousHeroData = queryClient.getQueryData("super-heros");
      queryClient.setQueryData("super-heros", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData.data?.length + 1, ...newHero },
          ],
        };
      });
    },
    onError: (_error, _hero, context) => {
      //rollback logic
      queryClient.setQueryData("super-heros", context.previousHeroData);
    },
    onSettled: () => {
      //this will ensure the client state in in sync with the server state
      queryClient.invalidateQueries("super-heros");
    },
  });
};
