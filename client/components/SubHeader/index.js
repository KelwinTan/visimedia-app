import { Container, Text } from "@nextui-org/react";
import color from "constants/color";
import Link from "next/link";
import { useUA } from "providers/user-agent";
import { hover, uMarginLeftAuto } from "styles/globals";
import { styContainer } from "./styles";

export default function SubHeader() {
  const { isMobile } = useUA();
  if (isMobile) {
    return null;
  }
  return (
    <div className={styContainer}>
      <Container fluid md display="flex">
        <Text color={color.white}>
          Welcome to Visimedia - Buka Senin-Jumat (08.00 - 17.00), Sabtu (08.00
          - 14.00)
        </Text>
        <div className={uMarginLeftAuto}>
          <Link href={"/faq/how-to-buy"}>
            <Text className={hover} color={color.white}>
              Cara berbelanja
            </Text>
          </Link>
        </div>
      </Container>
    </div>
  );
}
