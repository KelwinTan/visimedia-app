import { useMemo } from "react";
import { useLocation } from "react-router";

export default function useSearchParams() {
  const { search } = useLocation();
  return useMemo(() => {
    const qs = new URLSearchParams(search);
    let objQs = {};
    qs.forEach((value, key) => {
      objQs[key] = value;
    });
    return objQs;
  }, [search]);
}
