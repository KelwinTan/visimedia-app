import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import _axios from "shared/axios";

export default function useProduct() {
  const { data: _data, isFetching } = useQuery(["products"], () =>
    _axios.get("/products")
  );
  const data = useMemo(() => {
    return _data?.data?.products || [];
  }, [_data]);
  return {
    isFetching,
    data,
  };
}
