import { css } from "@emotion/css";
import { Divider, Grid, Text } from "@nextui-org/react";
import Layout from "./layout";

const style = {
  info: css`
    margin: 1rem 0;
  `,
};

export default function () {
  return (
    <Layout>
      <Grid.Container>
        <Grid>
          <div className={style.info}>
            <Text h4>Jakarta</Text>
            <Text>
              Pergudangan Elang Laut Sentra Industri Terpadu Tahap 3, Blok B
              No.1E Pantai Indah Kapuk, Jakarta Utara – 14470
            </Text>
          </div>

          <div className={style.info}>
            <Text h4>Email</Text>
            <Text>visimediasupplier@gmail.com</Text>
          </div>

          <div className={style.info}>
            <Text h4>Telepon</Text>
            <Text>021-29676248, 021-29676249, 021-26978100</Text>
          </div>

          <div className={style.info}>
            <Text h4>Direct Line</Text>
            <div>
              <Text>0813-1844-5541 : Lady</Text>
              <Text>08121-1020-0808 : Injil</Text>
              <Text>0812-1801-0828: Admin 1</Text>
              <Text>0812-1801-1828 : Admin 2</Text>
              <Text>0812-9329-5356 : Irma</Text>
              <Text>0821-8877-7505 : Paul</Text>
              <Text>0812-2819-2008 : Vanny</Text>
              <Text>0813-1999-0076 : Rusli</Text>
            </div>
          </div>
        </Grid>

        <Grid>Google map will be provide</Grid>
      </Grid.Container>

      <Divider css={{ margin: "2rem 0", borderStyle: "dashed" }} />

      <Grid.Container>
        <Grid>
          <div className={style.info}>
            <Text h4>BANDUNG</Text>
            <Text>
              Jl. Ciampel No.38 RT.05 RW.03 Desa Laksana Mekar Padalarang,
              Bandung Barat – 40553
            </Text>
          </div>

          <div className={style.info}>
            <Text h4>Email</Text>
            <Text>visimediasupplier@gmail.com</Text>
          </div>

          <div className={style.info}>
            <Text h4>Telepon</Text>
            <Text>022-86672877</Text>
          </div>

          <div className={style.info}>
            <Text h4>Direct Line</Text>
            <div>
              <Text>0819-3224-5500 : Rosiana</Text>
              <Text>0878-7849-1965 : Mario</Text>
            </div>
          </div>
        </Grid>

        <Grid>Google map will be provide</Grid>
      </Grid.Container>
    </Layout>
  );
}
