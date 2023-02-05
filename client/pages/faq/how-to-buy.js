import { Text } from "@nextui-org/react";
import Link from "next/link";
import Layout from "components/Layout/FAQ/layout";

export default function HowToBuy() {
  return (
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
          >
            <a style={{ wordBreak: "break-all" }}>
              https://www.tokopedia.com/visimediasupply
            </a>
          </Link>
          <br />
          <Link target="_blank" href="https://shopee.co.id/visimediasupply">
            <a style={{ wordBreak: "break-all" }}>
              https://shopee.co.id/visimediasupply
            </a>
          </Link>
          <br />
          <Link
            target="_blank"
            href="https://www.bukalapak.com/u/visimediasuppliesjkt"
          >
            <a style={{ wordBreak: "break-all" }}>
              https://www.bukalapak.com/u/visimediasuppliesjkt
            </a>
          </Link>
        </li>
      </ol>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
