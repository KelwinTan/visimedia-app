import Layout from "components/Layout/FAQ/layout";

export default function Payment() {
  return (
    <Layout>
      <ol>
        <li>Pembelian melalui Web (pembayaran : Debit . Kartu Kredit)</li>
        <li>Pembelian melalui market place ( tokopedia , shoope)</li>
        <li>
          Pembelian dengan datang Langsung (pembayaran : Transfer Bank , Debit ,
          Kartu Kredit)
        </li>
      </ol>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
