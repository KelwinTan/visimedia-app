import Layout from 'components/Layout/FAQ/layout';
import Head from 'next/head';

export default function Payment() {
  return (
    <>
      <Head>
        <title>Visimedia Supplies – Digital Printing Supplies</title>

        <meta
          name="description"
          content="Visimedia Supplies – Digital Printing Supplies"
        />
        <meta
          name="keywords"
          content="Digital print FAQ, Digital printing questions, Common digital printing queries, Frequently asked questions about digital printing, Digital print information, Printing technology FAQ, Print production questions, Digital printing basics, Print service questions, Online printing FAQs"
        />

        <meta name="robots" content="index, follow" />
      </Head>
      <Layout>
        <ol>
          <li>Pembelian melalui Web (pembayaran : Debit . Kartu Kredit)</li>
          <li>Pembelian melalui market place ( tokopedia , shoope)</li>
          <li>
            Pembelian dengan datang Langsung (pembayaran : Transfer Bank , Debit
            , Kartu Kredit)
          </li>
        </ol>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
