import React, { Fragment } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { Button, Grid, Typography } from "@mui/material";
/**
 * Our goal is to have a load more button and display two additional
 * color on every click
 *
 *Steps
 *1) We need to make changes to our useQuery Hook
 *   To cater to infinite queries, react query provides another hook
 *   called useInifiniteQuery
 *
 * 2) We focus on the fetcher function.
 *
 *    useInfiniteQuery injects a couple of values into the fetcher
 *    function.
 *
 *    For our scenario, we only need one value called pageParam
 *
 *    we passed the destructure value to fetchColors and assign
 *    default value of 1. Here pageParam sort of refers to the page
 *    number.
 *
 *    since, we want to view the first page by default so the initial
 *    value is 1
 *
 *    How do we change the pageParam value to fetch more data??
 *    For that, we passed in an option to the useInfiniteQuery
 *    called getNextPageParam which is a function and it receives
 *    two parameters lastpage and pages.
 *
 *    pages refers to an array of api responses where each response
 *    corrospond to fetching two colors at a time.
 *
 *     Within the getNextPageParam function, we have to determine
 *     how to increase the pageParam value
 *
 *     since we have 8 colors and 2 colors per page thus, we have 4 pages in total.
 *
 *      getNextPageParam function give us a property called hasNextPage which
 *      will be true or false based on whether we return undefined or not.
 *
 *      What should we call when we click on Load more button?
 *      For that, react query again provides a function called fetchNextPage.
 *
 *      Here, we will make use of two flags to show loading indicator
 *      A) isFetching
 *      B) isFetchingNextPage
 *
 *      useInfiniteQuery hook return data in different way compared to
 *      useQuery
 */
const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};
export const InfiniteQueries = () => {
  const {
    isLoading,
    data,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery("colors", fetchColors, {
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });
  if (isLoading) {
    return <Typography variant='h2'>Loading ...</Typography>;
  }

  if (isError) {
    return <Typography variant='h2'>{error.message}</Typography>;
  }

  return (
    <>
      <Grid container direction='column'>
        {data?.pages.map((group, index) => {
          return (
            <Fragment key={index}>
              {group.data.map((color) => (
                <Grid item key={color.id}>
                  <Typography variant='body1'>
                    {color.id} - {color.label}
                  </Typography>
                </Grid>
              ))}
            </Fragment>
          );
        })}
      </Grid>
      <Grid container>
        <Grid item>
          <Button
            variant='contained'
            onClick={fetchNextPage}
            disabled={!hasNextPage}
          >
            Load more
          </Button>
        </Grid>
      </Grid>
      {isFetching && !isFetchingNextPage ? "Fetching..." : null}
    </>
  );
};
