import { styNavBottom, styNavBottomItem } from "./style";
import HomeIcon from "components/Icon/HomeIcon";
import HamburgerIcon from "components/Icon/HamburgerIcon";
import SignInIcon from "components/Icon/SignInIcon";
import { Container, Text } from "@nextui-org/react";
import color from "constants/color";
import { useState } from "react";
import Link from "next/link";
import { useAside } from "providers/aside";

const colorItem = {
  active: color.primary,
  default: color.black,
};

const NavBottom = () => {
  const [active, setActive] = useState(0);
  const { setVisible, toggleVisible } = useAside();

  return (
    <div className={styNavBottom}>
      <Container display="flex" justify="space-between">
        <Link exact href="/">
          <a>
            <div
              className={styNavBottomItem}
              onClick={() => {
                setActive(0);
                setVisible("menu", false);
              }}
            >
              <HomeIcon
                width={20}
                height={20}
                color={active === 0 ? colorItem.active : colorItem.default}
              />
              <Text color={active === 0 ? colorItem.active : colorItem.default}>
                Home
              </Text>
            </div>
          </a>
        </Link>
        <div
          className={styNavBottomItem}
          onClick={() => {
            setActive(1);
            toggleVisible("menu");
          }}
        >
          <HamburgerIcon
            width={20}
            height={20}
            color={active === 1 ? colorItem.active : colorItem.default}
          />
          <Text color={active === 1 ? colorItem.active : colorItem.default}>
            Menu
          </Text>
        </div>
        <Link exact href="/login">
          <a>
            <div
              className={styNavBottomItem}
              onClick={() => {
                setActive(2);
                setVisible("menu", false);
              }}
            >
              <SignInIcon
                width={20}
                height={20}
                color={active === 2 ? colorItem.active : colorItem.default}
              />
              <Text color={active === 2 ? colorItem.active : colorItem.default}>
                Masuk
              </Text>
            </div>
          </a>
        </Link>
      </Container>
    </div>
  );
};

export default NavBottom;
