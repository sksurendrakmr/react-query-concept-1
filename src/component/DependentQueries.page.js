import React from "react";

/**
 * Lecture -17
 * In previous lectures, we learnt about parallel
 * queries.
 * The nice thing about parallel queries is that they
 * can be executed in parallel so as to maximize fetching
 * concurrency.
 *
 * However, we are also going to come across scenarios where
 * we need the queries to execute sequentially i.e. one after the other.
 *
 * This situation arises when we have one query dependent on the results
 * of another query.
 *
 * Requirement
 * In this component, we need to fetch list
 * of courses for the email 'sk@example.com' which this
 * component is receiving as props.
 *
 * Steps
 *   1) In our case, First we query for the user whose email is sk@example.com
 *
 *   2) Then using the channelId associated with the user, we need to fire the
 *      second query and fetch the channel details where the id matches the user's channelId.
 *
 *
 * 1. we need to fetch the user using the email props.
 *
 *
 *
 */

import { useQuery } from "react-query";
import axios from "axios";

const fetchUserByEmail = ({ queryKey }) => {
  const email = queryKey[1];
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};
export const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(["user", email], fetchUserByEmail);
  /**
   * Once we have the user, we can extract channelId property.
   *
   * Here, user refers to the API response and on the response we access
   * data which refers to the object present in db.json.
   * On this object, we access channelId.
   *
   * We also keep in mind that the user is not immediately available
   * and takes time to load. Hence the optional Channing
   */
  const channelId = user?.data.channelId;

  /**
   * step 2
   * We use this channelId to fetch the channel courses.
   * Begin with the fetcher function.
   *
   * But as it stands, this query will be fired as soon as the
   * component mount and the channelId would be equal to undefined.
   *
   * However, we want the query to be fired only after the channelId
   * has been retrieved.
   * For that, we will make use of enabled property in configuration object
   * of useQuery.
   *
   * Double negation convert the value to a boolean which is what
   * the enabled property expects.
   *
   * Initially, In devtools right away, we see three queries.
   *
   *
   * Initially, channelId is not set but react query does track that
   * such a query exists when the component mounts but it tags
   * the query as disabled.
   *
   * In the query explorer window, we will see the status is idle
   * so the request is not triggered when the channelId is not set.
   *
   * At the same time, the user query is fired and data will returned from this query.
   * Thus, now we have the channelId, so this is now used to make a get request
   * to fetch the channel details and the courses are retrived.
   */
  const { data: course } = useQuery(
    ["courses", channelId],
    () => fetchCoursesByChannelId(channelId),
    { enabled: !!channelId }
  );
  return <div>DependentQueriesPage</div>;
};
