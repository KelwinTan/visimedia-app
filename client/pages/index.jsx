import { css } from '@emotion/css';
import { Container, Grid, Row, Spacer, Text } from '@nextui-org/react';
import Marketplace from 'components/Cards/Marketplace';
import Carousel from 'components/Carousel';
import ProductCard from 'components/ProductCard';
import color from 'constants/color';
import Head from 'next/head';
import Image from 'next/image';
import _axios from 'shared/axios';
import { hover, styTextCenter } from 'styles/globals';
import Link from 'next/link';
import FacebookIcon from 'components/Icon/FacebookIcon';
import InstagramIcon from 'components/Icon/InstagramIcon';
import TwitterIcon from 'components/Icon/TwitterIcon';
import ShopeeIcon from 'components/Icon/ShopeeIcon';
import TokopediaIcon from 'components/Icon/TokopediaIcon';
import BukalapakIcon from 'components/Icon/BukalapakIcon';
import YoutubeIcon from 'components/Icon/YoutubeIcon';
import TiktokIcon from 'components/Icon/TiktokIcon';
import useCategories from 'hooks/useCategories';
import { useUA } from 'providers/user-agent';
import useBestProduct from 'hooks/useBestProduct';
import useProducts from 'hooks/useProducts';
import PrinterIcon from 'components/Icon/PrinterIcon';

export default function Home({ banners, categories }) {
  const { data: _categories } = useCategories();
  const { isMobile } = useUA();
  const { data: best_products } = useBestProduct();
  const { data: products } = useProducts();

  return <>
    <Head>
      <title>Visimedia Supplies – Digital Printing Supplies</title>
      <meta
        name="description"
        content="Visimedia Supplies – Digital Printing Supplies"
      />
      <meta
        name="keywords"
        content="digital printing services, high-quality digital printing, on-demand digital printing, custom digital printing, digital print solutions, digital printing company, digital printing technology, affordable digital printing, professional digital printing, full-color digital printing, digital printing for business, digital printing press, digital printing products, digital printing shop, fast digital printing, large format digital printing."
      />

      <meta name="robots" content="index, follow" />
    </Head>

    <Carousel
      items={banners.map((banner, idx) => (
        <a
          key={idx}
          href={banner.url_redirect}
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={css`
              width: 100%;
              position: relative;
              height: ${isMobile ? '132px' : '490px'};
            `}
          >
            <Image
              src={`${process.env.IMAGE_URL}${banner.public_image_path}`}
              layout={'fill'}
              objectFit="cover"
              alt="banner"
              priority={idx === 0}
            />
          </div>
        </a>
      ))}
    />

    <Spacer y={3} />

    <Container fluid md css={{ px: '1rem' }}>
      <Marketplace title={'List Kategori'}>
        <Grid.Container gap={2}>
          {categories?.map((data, idx) => (
            <Grid justify="center" key={idx} xs={4} md={2}>
              <Link
                href={{
                  pathname: '/category/[id]',
                  query: { id: data.id }
                }}
                className={styTextCenter}>

                <PrinterIcon
                  width={48}
                  height={48}
                  className={styTextCenter}
                  priority={idx < 2}
                />
                <Text
                  className={styTextCenter}
                  css={{ fontWeight: 'bolder' }}
                >
                  {data.name}
                </Text>
                <Text className={styTextCenter}>
                  {data.products?.length} produk
                </Text>

              </Link>
            </Grid>
          ))}
        </Grid.Container>
      </Marketplace>
    </Container>

    <Spacer y={2} />

    <Container fluid md css={{ px: '0.75rem' }}>
      <Grid.Container gap={isMobile ? 1 : 2} justify="center">
        <Grid xs={12} md={6}>
          <Marketplace title={'Social Media'}>
            <Grid.Container gap={2} justify="flex-start">
              <Grid justify="center" xs={4} md={4}>
                <Link href="https://www.facebook.com/visimediasupply" target="_blank">

                  <FacebookIcon color={color.blue} width={75} height={75} />

                </Link>
              </Grid>
              <Grid justify="center" xs={4} md={4}>
                <Link href="https://twitter.com/visimediasupply" target="_blank">

                  <TwitterIcon
                    color={color.twitter}
                    width={75}
                    height={75}
                  />

                </Link>
              </Grid>
              <Grid justify="center" xs={4} md={4}>
                <Link href="https://www.instagram.com/visimediasupply/" target="_blank">

                  <InstagramIcon color={color.ig} width={75} height={75} />

                </Link>
              </Grid>

              <Grid justify="center" xs={4} md={4}>
                <Link
                  href="https://www.youtube.com/channel/UCsMPBOwCuzcEDQAtCNMCmM"
                  target="_blank">

                  <YoutubeIcon
                    color={color.youtube}
                    width={75}
                    height={75}
                  />

                </Link>
              </Grid>

              <Grid justify="center" xs={4} md={4}>
                <Link href="https://www.tiktok.com/@visimediaofficial" target="_blank">

                  <TiktokIcon color={color.tiktok} width={75} height={75} />

                </Link>
              </Grid>
            </Grid.Container>
          </Marketplace>
        </Grid>
        <Grid xs={12} md={6}>
          <Marketplace title={'Marketplace'}>
            <Grid.Container gap={3} justify="flex-start">
              <Grid justify="center" xs={12} md={6}>
                <Link href="https://www.tokopedia.com/visimediasupply" target="_blank">

                  <TokopediaIcon ecommerce width={250} height={75} />

                </Link>
              </Grid>
              <Grid justify="center" xs={12} md={6}>
                <Link href="https://shopee.co.id/visimediasupply" target="_blank">

                  <ShopeeIcon ecommerce width={250} height={75} />

                </Link>
              </Grid>
              <Grid justify="center" xs={12} md={6}>
                <Link href="https://www.bukalapak.com/u/visimediasuppliesjkt" target="_blank">

                  <BukalapakIcon ecommerce width={250} height={75} />

                </Link>
              </Grid>
            </Grid.Container>
          </Marketplace>
        </Grid>
      </Grid.Container>
    </Container>

    <Spacer y={2} />

    <Container fluid md>
      <Row align="center">
        <Text h4 css={{ mb: 0 }}>
          Produk Terbaik
        </Text>
        <Link passHref href="/category/3" legacyBehavior>
          <Text css={{ ml: '$8', color: color.primary }} b className={hover}>
            Lihat semua
          </Text>
        </Link>
      </Row>
      <Grid.Container gap={2} css={{ px: 0 }} justify="flex-start">
        {best_products.map((item, index) => (
          <Grid xs={6} sm={3} key={index}>
            <ProductCard item={item} />
          </Grid>
        ))}
      </Grid.Container>
    </Container>

    <Spacer y={2} />

    <Container fluid md>
      <Row align="center">
        <Text h4 css={{ mb: 0 }}>
          Produk pilihan untukmu
        </Text>
        <Link passHref href="/category/3" legacyBehavior>
          <Text css={{ ml: '$8', color: color.primary }} b className={hover}>
            Lihat semua
          </Text>
        </Link>
      </Row>
      <Grid.Container gap={2} css={{ px: 0 }} justify="flex-start">
        {products.map((item, index) => (
          <Grid xs={6} sm={3} key={index}>
            <ProductCard item={item} />
          </Grid>
        ))}
      </Grid.Container>
    </Container>
  </>;
}

export async function getServerSideProps() {
  const [banners, categories] = await Promise.all([
    _axios.get('/banners').then(res => res.data?.banners || []),
    _axios.get('/categories').then(res => res.data?.categories || [])
  ]);

  return {
    props: { banners, categories } // will be passed to the page component as props
  };
}
