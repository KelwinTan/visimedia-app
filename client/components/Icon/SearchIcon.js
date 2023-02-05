import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import color from "constants/color";

const SearchIcon = () => {
  return <FontAwesomeIcon style={{ color: color.primary }} icon={faSearch} />;
};

export default SearchIcon;
