import { Card, Container, Badge, Text } from "@nextui-org/react";

export default function ProductCard(props) {
  const { item } = props;

  return (
    <>
      <Card isPressable>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={"https://nextui.org" + item.img}
            objectFit="cover"
            width="100%"
            height={147}
            alt={item.title}
          />
        </Card.Body>
        <Card.Footer>
          <Container css={{ p: 0 }} direction="column" alignItems="flex-start">
            <Text css={{ fontWeight: "$medium" }}>{item.title}</Text>
            <Text
              css={{
                fontWeight: "$bold",
              }}
            >
              {item.final_price}
            </Text>
            {!!item.discount && (
              <>
                <Badge color={"error"} css={{ mr: 2 }} size="xs">
                  {item.discount * 100}%
                </Badge>
                <Text del css={{ fontSize: "$xs" }}>
                  {item.price}
                </Text>
              </>
            )}

            <Text size={12}>Terjual {item.sold}+</Text>
          </Container>
        </Card.Footer>
      </Card>
    </>
  );
}
