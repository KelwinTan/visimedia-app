import { Card, Container, Row, Spacer, Text } from "@nextui-org/react";
import ShopeeIcon from "components/Icon/ShopeeIcon";
import TokopediaIcon from "components/Icon/TokopediaIcon";
import WhatsappIcon from "components/Icon/WhatsappIcon";
import color from "constants/color";
import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";
import toIDR from "shared/currency/toIDR";
import { hover, w100 } from "styles/globals";

const ProductCard = forwardRef((props, ref) => {
  const { item } = props;

  return (
    <Card isHoverable className={hover} ref={ref}>
      <Card.Body css={{ p: 0 }}>
        <Image
          src={process.env.IMAGE_URL + item.public_image_url}
          objectFit="cover"
          width="100%"
          height={300}
          alt={item.name}
          loading="lazy"
        />
      </Card.Body>
      <Card.Footer>
        <Container css={{ p: 0 }} direction="column" alignItems="flex-start">
          <Link
            passHref
            href={{ pathname: "/product/[id]", query: { id: item.id } }}
          >
            <a>
              <Text css={{ fontWeight: "$medium" }}>{item.name}</Text>
            </a>
          </Link>
          <Text
            css={{
              fontWeight: "$bold",
            }}
          >
            Rp{toIDR(item.price)}
          </Text>
          <Spacer y={0.25} />
          <Row align="center">
            <a
              href="https://api.whatsapp.com/send/?phone=6282110200808&text=Hallo+Visimedia...&type=phone_number&app_absent=0"
              target={"_blank"}
            >
              <WhatsappIcon color={color.wa} width={25} />
            </a>
            {item.tokopedia_link && item.tokopedia_link !== "null" && (
              <a href={item.tokopedia_link} target={"_blank"}>
                <TokopediaIcon width={25} />
              </a>
            )}
            {item.shopee_link && item.shopee_link !== "null" && (
              <a href={item.shopee_link} target={"_blank"}>
                <ShopeeIcon marketPlace width={25} />
              </a>
            )}
          </Row>
        </Container>
      </Card.Footer>
    </Card>
  );
});

ProductCard.displayName = "ProductCard";
export default ProductCard;