import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { getChildren, GetChildrenResponse } from "../api";
import Child from "../components/Child";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

type ChildListProps = {};

const groupId = "11fc220c-ebba-4e55-9346-cd1eed714620";
const institutionId = "fb6c8114-387e-4051-8cf7-4e388a77b673";

export default function ChildList(props: ChildListProps) {
  const {
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
    data,
  } = useInfiniteQuery<GetChildrenResponse, Error>(
    ["children", groupId, institutionId],
    ({ pageParam }) => getChildren({ page: pageParam, groupId, institutionId }),
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.hasMore) return;

        return pages.length + 1;
      },
    }
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  const noResults = !data?.pages || data?.pages.length < 1;

  if (noResults) return <span>No results</span>;

  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={() => fetchNextPage()}
      hasMore={!isFetching && hasNextPage}
      loader={<div key={0}>Loading ...</div>}
    >
      <List>
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group?.children.map((child) => (
              <ListItem key={child.childId}>
                <Child data={child} />
              </ListItem>
            ))}
          </React.Fragment>
        ))}
      </List>
    </InfiniteScroll>
  );
}
