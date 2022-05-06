import { Container, Text } from "@nextui-org/react";
import CloseIcon from "components/Icon/CloseIcon";
import Portal from "components/Portal";
import color from "constants/color";
import Link from "next/link";
import { useDropdown } from "providers/dropdown";
import { styAside, styAsideItem, styHeader } from "./style";

export default function Aside() {
  const { setVisible, visible } = useDropdown();

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

        <div className={styAsideItem}>
          <Container fluid>
            <Link href="/">
              <a>
                <Text weight={"semibold"}>Flexi Frontlite</Text>
              </a>
            </Link>
          </Container>
        </div>
        <div className={styAsideItem}>
          <Container fluid>
            <Link href="/">
              <a>
                <Text weight={"semibold"}>Flexi Backlite</Text>
              </a>
            </Link>
          </Container>
        </div>

        <div className={styAsideItem}>
          <Container fluid>
            <Link href="/">
              <a>
                <Text weight={"semibold"}>Media Indoor</Text>
              </a>
            </Link>
          </Container>
        </div>

        <div className={styAsideItem}>
          <Container fluid>
            <Link href="/">
              <a>
                <Text weight={"semibold"}>Stickers</Text>
              </a>
            </Link>
          </Container>
        </div>

        <div className={styAsideItem}>
          <Container fluid>
            <Link href="/">
              <a>
                <Text weight={"semibold"}>Laminating</Text>
              </a>
            </Link>
          </Container>
        </div>

        <div className={styAsideItem}>
          <Container fluid>
            <Link href="/">
              <a>
                <Text weight={"semibold"}>Display</Text>
              </a>
            </Link>
          </Container>
        </div>

        <div className={styAsideItem}>
          <Container fluid>
            <Link href="/">
              <a>
                <Text weight={"semibold"}>Ink & Accessories</Text>
              </a>
            </Link>
          </Container>
        </div>
      </aside>
    </Portal>
  );
}
