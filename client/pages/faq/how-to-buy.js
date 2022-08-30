import { Text } from "@nextui-org/react";
import Link from "next/link";
import Layout from "./layout";

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
            https://www.tokopedia.com/visimediasupply
          </Link>{" "}
          <br />
          <Link target="_blank" href="https://shopee.co.id/visimediasupply">
            https://shopee.co.id/visimediasupply
          </Link>{" "}
          <br />
          <Link
            target="_blank"
            href="https://www.bukalapak.com/u/visimediasuppliesjkt"
          >
            https://www.bukalapak.com/u/visimediasuppliesjkt
          </Link>{" "}
        </li>
      </ol>
    </Layout>
  );
}
