/**
 * !Our aim here is to fetech both superheros and friends from db.json in this page
    

 **Parallel queries are queries that are executed in parallel so as to maximize fetching concurrency
 *!With ReactQuery, executing parallel queries is as simple as invoking useQuery multiple times.
 
 *?To resolve the conflict between destructured variables from multiple useQuery, we make use of aliases
*/

import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeros = () => axios.get("http://localhost:4000/superheros");
const fetchFriends = () => axios.get("http://localhost:4000/friends");

export const ParallelQueriesPage = () => {
  const { data: superHeros } = useQuery("super-heros", fetchSuperHeros);
  const { data: friends } = useQuery("friends", fetchFriends);
  return (
    <div>
      <h1>ParallelQueries</h1>
    </div>
  );
};
