import { Text } from '@nextui-org/react';
import Link from 'next/link';
import Layout from 'components/Layout/FAQ/layout';
import Head from 'next/head';

export default function HowToBuy() {
  return <>
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
        <li>
          <Text>Pembelian Melalui Web (Datang Langsung)</Text>
        </li>
        <li>
          <Text>Pembelian Melalui Toko</Text>
          <Text>Pembayaran : CASH, DEBIT, KARTU KREDIT & TRANSFER BANK</Text>
        </li>
        <li>
          <Text>Pembelian Melalui Marketplace</Text>
          <Link
            target="_blank"
            href="https://www.tokopedia.com/visimediasupply"
            style={{ wordBreak: 'break-all' }}>
            
              https://www.tokopedia.com/visimediasupply
            
          </Link>
          <br />
          <Link
            target="_blank"
            href="https://shopee.co.id/visimediasupply"
            style={{ wordBreak: 'break-all' }}>
            
              https://shopee.co.id/visimediasupply
            
          </Link>
          <br />
          <Link
            target="_blank"
            href="https://www.bukalapak.com/u/visimediasuppliesjkt"
            style={{ wordBreak: 'break-all' }}>
            
              https://www.bukalapak.com/u/visimediasuppliesjkt
            
          </Link>
        </li>
      </ol>
    </Layout>
  </>;
}

export async function getStaticProps() {
  return { props: {} };
}
