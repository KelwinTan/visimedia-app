import { Input, Loading } from "@nextui-org/react";
import SearchIcon from "components/Icon/SearchIcon";
import color from "constants/color";
import debounce from "lodash/debounce";
import { useCallback } from "react";

export default function SearchInput() {
  const onChange = useCallback(
    debounce((e) => {}, 500),
    []
  );

  return (
    <>
      <Input
        placeholder="Cari Produk"
        animated={false}
        shadow={false}
        fullWidth
        type="search"
        onChange={onChange}
        // contentRight={<SearchIcon />}
        contentRight={<Loading size="xs" color={"primary"} />}
      />
    </>
  );
}
