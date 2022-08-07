import { Text, Dropdown } from "@nextui-org/react";
import Link from "next/link";
import HamburgerIcon from "components/Icon/HamburgerIcon";

export default function MenuDesktop() {
  return (
    <>
      <Dropdown>
        <Dropdown.Button light size="sm">
          <HamburgerIcon />
        </Dropdown.Button>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link href="/">
              <a>
                <Text weight={"semibold"}>Flexi Frontlite</Text>
              </a>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href="/">
              <a>
                <Text weight={"semibold"}>Flexi Backlite</Text>
              </a>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item>
            <Link href="/">
              <a>
                <Text weight={"semibold"}>Media Indoor</Text>
              </a>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item>
            <Link href="/">
              <a>
                <Text weight={"semibold"}>Stickers</Text>
              </a>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item>
            <Link href="/">
              <a>
                <Text weight={"semibold"}>Laminating</Text>
              </a>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item>
            <Link href="/">
              <a>
                <Text weight={"semibold"}>Display</Text>
              </a>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item>
            <Link href="/">
              <a>
                <Text weight={"semibold"}>Ink & Accessories</Text>
              </a>
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
