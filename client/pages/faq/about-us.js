import { css } from "@emotion/css";
import { Col, Grid, Row, Text } from "@nextui-org/react";
import Link from "next/link";
import Layout from "components/Layout/FAQ/layout";

const style = {
  info: css`
    margin: 2rem 0;
  `,
};

export default function AboutUs() {
  return (
    <Layout>
      <Grid.Container>
        <Grid>
          <Text b h3>
            Visimedia merupakan salah satu distributor material digital printing
            terkemuka dan terlengkap di Indonesia
          </Text>
          <div className={style.info}>
            <Text h4>JAKARTA</Text>
            <Row>
              <Col span={2}>Lokasi </Col>:
              <Col css={{ pl: 10 }}>
                Sentra Industri Terpadu Tahap 3 Blok B No.1E Elang Laut, Pantai
                Indah Kapuk, Jakarta Utara 14470
              </Col>
            </Row>

            <Row css={{ pt: 10 }}>
              <Col span={2}>Email</Col>:
              <Col css={{ pl: 10 }}>visimediasupplier@ gmail.com</Col>
            </Row>

            <Row css={{ pt: 10 }}>
              <Col span={2}>Telepon</Col>:
              <Col css={{ pl: 10 }}>
                021 2967 6248, 021 2967 6249, 021 2967 8100
              </Col>
            </Row>

            <Row css={{ pt: 10 }}>
              <Col span={2}>Direct Line</Col>:
              <Col css={{ pl: 10 }}>
                <Text>0812 1801 1828 (Lady)</Text>
                <Text>0821 1020 0808 (Injil Gosal)</Text>
                <Text>0812 2819 2008 (Vanny)</Text>
                <Text>0855 1997 505 (Paul)</Text>
                <Text>0813 1999 0076 (Rusli)</Text>
                <Text>0812 9329 5356 (Rika)</Text>
              </Col>
            </Row>

            <Row css={{ pt: 10 }}>
              <Col span={2}>Maps</Col>:
              <Col css={{ pl: 10 }}>
                <Link
                  href={"https://goo.gl/maps/gjZnV51Ry4p3fTsX9"}
                  target="_blank"
                >
                  https://goo.gl/maps/gjZnV51Ry4p3fTsX9
                </Link>
              </Col>
            </Row>
          </div>

          <div className={style.info}>
            <Text h4>BANDUNG</Text>
            <Row>
              <Col span={2}>Lokasi </Col>:
              <Col css={{ pl: 10 }}>
                Jl. Ciampel No.38 RT.05/RW.03 Desa Laksanamekar, Padalarang,
                Bandung Barat 40553
              </Col>
            </Row>

            <Row css={{ pt: 10 }}>
              <Col span={2}>Email</Col>:
              <Col css={{ pl: 10 }}>visimediasupplier@ gmail.com</Col>
            </Row>

            <Row css={{ pt: 10 }}>
              <Col span={2}>Telepon</Col>:
              <Col css={{ pl: 10 }}>022 8667 2877</Col>
            </Row>

            <Row css={{ pt: 10 }}>
              <Col span={2}>Direct Line</Col>:
              <Col css={{ pl: 10 }}>
                <Text>0819 3224 5500 (Rosiana)</Text>
                <Text>0878 7849 1965 (Mario)</Text>
              </Col>
            </Row>

            <Row css={{ pt: 10 }}>
              <Col span={2}>Maps</Col>:
              <Col css={{ pl: 10 }}>
                <Link
                  href={"https://goo.gl/maps/KbTZ7meHG81bvsEK7"}
                  target="_blank"
                >
                  https://goo.gl/maps/KbTZ7meHG81bvsEK7
                </Link>
              </Col>
            </Row>
          </div>

          <div className={style.info}>
            <Text h4>CIREBON</Text>
            <Row>
              <Col span={2}>Lokasi </Col>:
              <Col css={{ pl: 10 }}>
                Jl. Kalitanjung No.10 RT.01/RW.05 Harjamukti, Cirebon 45141
              </Col>
            </Row>

            <Row css={{ pt: 10 }}>
              <Col span={2}>Email</Col>:
              <Col css={{ pl: 10 }}>visimediasupplier@ gmail.com</Col>
            </Row>

            <Row css={{ pt: 10 }}>
              <Col span={2}>Telepon</Col>:<Col css={{ pl: 10 }}></Col>
            </Row>

            <Row css={{ pt: 10 }}>
              <Col span={2}>Direct Line</Col>:
              <Col css={{ pl: 10 }}>
                <Text>0819 3224 5500 (Rosiana)</Text>
                <Text>0878 7849 1965 (Mario)</Text>
              </Col>
            </Row>

            <Row css={{ pt: 10 }}>
              <Col span={2}>Maps</Col>:
              <Col css={{ pl: 10 }}>
                <Link
                  href={"https://goo.gl/maps/UjoiXvDdeNjSjDtm6"}
                  target="_blank"
                >
                  https://goo.gl/maps/UjoiXvDdeNjSjDtm6
                </Link>
              </Col>
            </Row>
          </div>
        </Grid>
      </Grid.Container>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
