import { Container, Text } from "@nextui-org/react";
import CloseIcon from "components/Icon/CloseIcon";
import Portal from "components/Portal";
import color from "constants/color";
import Link from "next/link";
import { useCategory } from "providers/categories";
import { useDropdown } from "providers/dropdown";
import { useEffect, useState } from "react";
import { styAside, styAsideItem, styHeader } from "./style";

export default function Aside() {
  const { setVisible, visible } = useDropdown();
  const { getAll } = useCategory();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAll().then((data) => setCategories(data));
  }, []);

  return (
    <Portal>
      <aside className={styAside({ visible })}>
        <div className={styHeader}>
          <Container
            fluid
            display="flex"
            justify={"space-between"}
            css={{ margin: "unset" }}
          >
            <Text weight="bold" h5 color={color.white}>
              PRODUK
            </Text>
            <div onClick={() => setVisible(!visible)}>
              <CloseIcon color={color.white} />
            </div>
          </Container>
        </div>

        {categories.map((data, idx) => (
          <div key={idx} className={styAsideItem}>
            <Container fluid>
              <Link
                href={{ pathname: "/category/[id]", query: { id: data.id } }}
              >
                <a>
                  <Text weight={"semibold"}>{data.name}</Text>
                </a>
              </Link>
            </Container>
          </div>
        ))}
      </aside>
    </Portal>
  );
}
