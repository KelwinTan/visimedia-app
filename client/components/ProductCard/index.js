import { Card, Container, Row, Spacer, Text } from '@nextui-org/react';
import ShopeeIcon from 'components/Icon/ShopeeIcon';
import TokopediaIcon from 'components/Icon/TokopediaIcon';
import WhatsappIcon from 'components/Icon/WhatsappIcon';
import color from 'constants/color';
import { Image } from '@nextui-org/react';
import Link from 'next/link';
import { useUA } from 'providers/user-agent';
import { forwardRef } from 'react';
import toIDR from 'shared/currency/toIDR';
import { hover, w100 } from 'styles/globals';

const ProductCard = forwardRef((props, ref) => {
  const { item } = props;
  const { isMobile } = useUA();

  return (
    <Card isHoverable className={hover} ref={ref}>
      <Card.Body css={{ p: 0 }}>
        <Link
          passHref
          href={{ pathname: '/product/[id]', query: { id: item.id } }}
          rel="noreferrer"
        >
          <Image
            src={process.env.IMAGE_URL + item.public_image_url}
            objectFit="fill"
            width="100%"
            height={isMobile ? 180 : 300}
            alt={item.name}
            loading="lazy"
            quality={100}
          />
        </Link>
      </Card.Body>
      <Card.Footer>
        <Container css={{ p: 0 }} direction="column" alignItems="flex-start">
          <Link
            passHref
            href={{ pathname: '/product/[id]', query: { id: item.id } }}
            rel="noreferrer"
          >
            <Text css={{ fontWeight: '$medium' }}>{item.name}</Text>
          </Link>
          <Text
            css={{
              fontWeight: '$bold'
            }}
          >
            Rp{toIDR(item.price)}
          </Text>
          <Spacer y={0.25} />
          <Row align="center">
            <a
              href="https://api.whatsapp.com/send/?phone=6282110200808&text=Hallo+Visimedia...&type=phone_number&app_absent=0"
              target={'_blank'}
              rel="noreferrer"
            >
              <WhatsappIcon color={color.wa} width={25} />
            </a>
            {item.tokopedia_link && item.tokopedia_link !== 'null' && (
              <a href={item.tokopedia_link} target={'_blank'} rel="noreferrer">
                <TokopediaIcon width={25} />
              </a>
            )}
            {item.shopee_link && item.shopee_link !== 'null' && (
              <a href={item.shopee_link} target={'_blank'} rel="noreferrer">
                <ShopeeIcon marketPlace width={25} />
              </a>
            )}
          </Row>
        </Container>
      </Card.Footer>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;
