import { cx } from "@emotion/css";
import { Card, Container, Badge, Text } from "@nextui-org/react";
import { forwardRef } from "react";
import toIDR from "shared/currency/toIDR";
import { height, hover, w100 } from "styles/globals";

const ProductCard = forwardRef((props, ref) => {
  const { item, ...rest } = props;
  return (
    <a {...rest} className={cx(w100, height(255))}>
      <Card isHoverable className={hover} ref={ref}>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={process.env.IMAGE_URL + item.public_image_url}
            objectFit="cover"
            width="100%"
            height={147}
            alt={item.title}
          />
        </Card.Body>
        <Card.Footer>
          <Container css={{ p: 0 }} direction="column" alignItems="flex-start">
            <Text css={{ fontWeight: "$medium" }}>{item.name}</Text>
            <Text
              css={{
                fontWeight: "$bold",
              }}
            >
              Rp{toIDR(item.price)}
            </Text>
            {/* <Text size={12}>Terjual {item.sold}+</Text> */}
          </Container>
        </Card.Footer>
      </Card>
    </a>
  );
});

ProductCard.displayName = "ProductCard";
export default ProductCard;
