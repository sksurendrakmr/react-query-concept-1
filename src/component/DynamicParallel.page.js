import { useQueries } from "react-query";
import axios from "axios";

/**
 * !The data we need to fetch is the hero details.
 * !Details about one single hero.
 *
 * ?However the component doesn't fetch details for just one hero.
 * *It may have to fetch data for multiple heros.
 *
 * ?In App.js, DynamicParallelPage has a props which has array of heroIds.
 * !So the component will not know beforehand, how many queries to execute.
 *
 * *Notes - If the number of queries we need to execute is changing from render
 * *to render, we cannot use manual querying as that would voilate the rules of hooks
 *
 * !To cater to this specific scenarios react query provide another hooks called useQueries
 */
const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost/4000/superheros/${heroId}`);
};

export const DynamicParallelPage = ({ heroIds }) => {
  /**
   * !we have heroIds (as props) which is an array. So as an argument to useQueries we are going
   * !to map over the ids and return an object that translates to a query.
   *
   * *The return object has two properties.
   * *1) queryKey
   * *2) FetcherFunction
   *
   * !All we are doing is finding another way to call useQuery to make sure we are not voilating the rules of hooks.
   *
   * ?So every id in heroIds we are now making a separate query.
   *
   * !useQueries returns an array of query results.
   */
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );

  console.log({ queryResults });
  return <div>DynamicParallel</div>;
};
