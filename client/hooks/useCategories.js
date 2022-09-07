import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import _axios from "shared/axios";

export default function useCategories() {
  const { isFetching, data: _data } = useQuery(["categories"], () =>
    _axios.get("/categories")
  );
  const data = useMemo(() => {
    return _data?.data?.categories || [];
  }, [_data]);

  console.log({ _data });
  return {
    data,
    isFetching,
  };
}
