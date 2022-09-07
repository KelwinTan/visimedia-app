import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import _axios from "shared/axios";

export default function useBestProduct() {
  const { data: _data, isFetching } = useQuery(["best-products"], () =>
    _axios.get("/best-seller")
  );
  const data = useMemo(() => {
    return _data?.data?.best_sellers?.map((d) => d.product) || [];
  }, [_data]);
  return {
    isFetching,
    data,
  };
}
