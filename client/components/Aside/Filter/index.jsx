import { Container, Text } from "@nextui-org/react";
import CloseIcon from "components/Icon/CloseIcon";
import Portal from "components/Portal";
import color from "constants/color";
import useCategories from "hooks/useCategories";
import Link from "next/link";
import { useAside } from "providers/aside";
import { styAside, styAsideItem, styHeader } from "../style";

export default function FilterMobile() {
  const { data: _categories } = useCategories();
  const { toggleVisible, visible } = useAside();

  return (
    <Portal>
      <aside className={styAside({ visible: visible.filter })}>
        <div className={styHeader}>
          <Container
            fluid
            display="flex"
            justify={"space-between"}
            css={{ margin: "unset" }}
          >
            <Text weight="bold" h5 color={color.white}>
              FILTER PRODUK
            </Text>
            <div onClick={() => toggleVisible("filter")}>
              <CloseIcon color={color.white} />
            </div>
          </Container>
        </div>

        {_categories.map((data, idx) => (
          <div key={idx} className={styAsideItem}>
            <Container fluid>
              <Link
                href={{
                  pathname: "/category/[id]",
                  query: { id: data.id },
                }}
              >
                <a onClick={() => toggleVisible("filter")}>
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
