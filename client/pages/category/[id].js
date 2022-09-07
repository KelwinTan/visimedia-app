import {
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
import ProductCard from "components/ProductCard";
import useCategories from "hooks/useCategories";
import Link from "next/link";
import _axios from "shared/axios";

export default function CategoryDetail({ category }) {
  const { data: categories } = useCategories();
  return (
    <>
      <Breadcrumb links={["home", "detail", category.name]} />
      <Spacer y={1} />
      <Container fluid md>
        <Row>
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
          <Col span={9} css={{ px: 18 }}>
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
