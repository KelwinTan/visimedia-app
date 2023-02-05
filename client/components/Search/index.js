import { Input, Loading } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import SearchIcon from "components/Icon/SearchIcon";
import useEventListener from "hooks/useEventListener";
import debounce from "lodash/debounce";
import { useCallback, useMemo, useState } from "react";
import _axios from "shared/axios";
import ListSearch from "./List";

export default function SearchInput() {
  const [search, setSearch] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  useEventListener("click", () => {
    setShowSuggestion(false);
  });

  const { isFetching, data } = useQuery(
    ["homepagesearch", search],
    () => _axios.post("/products/search-product", { search }),
    {
      enabled: !!search,
      onSuccess() {
        setShowSuggestion(true);
      },
    }
  );

  const onChange = useCallback(
    debounce((e) => {
      setSearch(e.target.value);
    }, 500),
    []
  );

  const searchData = useMemo(() => data?.data?.products || [], [data]);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <Input
        clearable={false}
        placeholder="Cari Produk"
        animated={false}
        shadow={false}
        fullWidth
        type="search"
        onChange={onChange}
        contentRight={
          isFetching ? <Loading size="xs" color={"primary"} /> : <SearchIcon />
        }
      />
      <ListSearch
        data={searchData}
        show={showSuggestion}
        onSelected={() => setShowSuggestion(false)}
      />
    </div>
  );
}
