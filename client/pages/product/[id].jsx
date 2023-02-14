import {
  Card,
  Col,
  Container,
  Image,
  Row,
  Spacer,
  Text
} from '@nextui-org/react';
import Breadcrumb from 'components/Breadcrumb';
import Head from 'next/head';
import { useUA } from 'providers/user-agent';
import _axios from 'shared/axios';
import toIDR from 'shared/currency/toIDR';
import Button from 'components/Button';
import ProductVariant from 'components/ProductVariant';
import { useRouter } from 'next/router';
import { useCallback, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import auth from 'constants/auth';

export default function ProductDetail({ product }) {
  const { isMobile, isDesktop } = useUA();
  const router = useRouter();
  const productVariantRef = useRef();

  const { mutateAsync } = useMutation(vars =>
    _axios.post('cart-items', vars, {
      headers: {
        Authorization: `Bearer ${getCookie(auth.TOKEN)}`
      }
    })
  );

  const goCheckout = useCallback(() => {
    const selectedVariant = productVariantRef.current.getSelectedVariant();
    mutateAsync({
      product_id: product.id,
      quantity: 1,
      product_variant_id: selectedVariant.id
    }).then(() => {
      router.push('/cart');
    });
  }, [router]);

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
      </Head>
      <Breadcrumb links={['home', 'detail', product.name]} />
      <Container md css={{ mt: '$10' }} fluid>
        <Row wrap="wrap">
          <Col span={isMobile ? 12 : 4}>
            <Image
              src={process.env.IMAGE_URL + product.public_image_url}
              alt="Default Image"
              objectFit="cover"
            />
          </Col>
          <Col span={isMobile ? 12 : 4} css={{ pl: isDesktop ? '$10' : '$0' }}>
            <Text h4>{product.name}</Text>
            <Text>Harga Rp.{toIDR(product.price)}</Text>
            <Text css={{ mt: '$8' }}>{product.description}</Text>
            {isMobile && (
              <>
                <Spacer y={1} />
                <ProductVariant ref={productVariantRef} product={product} />
              </>
            )}
          </Col>
          {isDesktop && (
            <Col span={3} css={{ pl: '$8' }}>
              <Card
                variant="bordered"
                css={{ borderRadius: 8, maxWidth: isMobile ? '100%' : 300 }}
              >
                <Card.Body>
                  <ProductVariant ref={productVariantRef} product={product} />
                  <Button onClick={goCheckout} bordered={false} primary>
                    Beli Sekarang
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
      {/* if mobile, show beli in bottom dock */}
      {isMobile && (
        <Row
          css={{
            position: 'fixed',
            bottom: 65,
            zIndex: 10,
            backgroundColor: 'White',
            padding: 8,
            boxShadow: '0 0 1px rgba(0,0,0,.2)'
          }}
        >
          <Button onClick={goCheckout} fullWidth bordered={false} primary>
            Beli Sekarang
          </Button>
        </Row>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const {
    data: { product }
  } = await _axios.get('/products/' + id);

  return {
    props: { product } // will be passed to the page component as props
  };
}
