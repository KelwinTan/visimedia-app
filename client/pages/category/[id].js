import {
  Button,
  Card,
  Col,
  Collapse,
  Container,
  Grid,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import Breadcrumb from "components/Breadcrumb";
import FilterIcon from "components/Icon/FilterIcon";
import ProductCard from "components/ProductCard";
import useCategories from "hooks/useCategories";
import Head from "next/head";
import Link from "next/link";
import { useAside } from "providers/aside";
import { useUA } from "providers/user-agent";
import _axios from "shared/axios";
import { styPlainButton } from "styles/globals";

export default function CategoryDetail({ category }) {
  const { data: categories } = useCategories();
  const { isDesktop } = useUA();
  const { toggleVisible } = useAside();

  return (
    <>
      <Head>
        <title>Kategori: {category.name} – Digital Printing Supplies</title>
        <meta
          name="description"
          content="Visimedia Supplies – Digital Printing Supplies"
        />
      </Head>

      <Breadcrumb links={["home", "kategori", category.name]} />
      <Spacer y={1} />
      <Container fluid md>
        <Row>
          {isDesktop && (
            <Col span={3}>
              <Card>
                <Card.Body>
                  <Text h3>Filter</Text>
                  <Collapse.Group divider={false}>
                    <Collapse title={<Text h5>Kategori</Text>}>
                      {categories.map((data, idx) => (
                        <Link
                          key={idx}
                          href={{
                            pathname: "/category/[id]",
                            query: { id: data.id },
                          }}
                        >
                          <a>
                            <Text>{data.name}</Text>
                          </a>
                        </Link>
                      ))}
                    </Collapse>
                  </Collapse.Group>
                </Card.Body>
              </Card>
            </Col>
          )}
          <Col span={isDesktop ? 9 : 12} css={{ px: 18 }}>
            <Row>
              <Col span={10}>
                <Text h3>Kategori: {category.name}</Text>
              </Col>
              <Col span={2}>
                <button
                  onClick={() => toggleVisible("filter")}
                  className={styPlainButton}
                >
                  <FilterIcon />
                </button>
              </Col>
            </Row>
            <Spacer y={1} />
            <Grid.Container gap={2} justify="flex-start">
              {category?.products.map((item, index) => (
                <Grid xs={12} sm={4} css={{ pt: 0, pb: "$10" }} key={index}>
                  <Link
                    passHref
                    href={{ pathname: "/product/[id]", query: { id: item.id } }}
                  >
                    <ProductCard item={item} />
                  </Link>
                </Grid>
              ))}
            </Grid.Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const { data } = await _axios.get("/categories/" + id);
  return {
    props: { category: data.category || {} },
  };
}
