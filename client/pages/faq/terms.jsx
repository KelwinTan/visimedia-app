import Layout from 'components/Layout/FAQ/layout';
import Head from 'next/head';

export default function Delivery() {
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
          <li>
            Transaksi dapat dilakukan secara online , dan pembayaran hanya bisa
            dilakukan Via Transfer Bank atau melalui pembayaran market place
            (Tokopedia , Shoope)
          </li>
          <li>
            Setelah melakukan pembayaran , pembeli wajib melakukan konfirmasi
            pembayaran melalui Wa Admin , kemudian pembeli akan mendapat
            konfirmasi dari kami bahwa dana telah masuk.
          </li>
          <li>Pesanan kami proses setelah adanya konfirmasi pembayaran</li>
          <li>Keep Barang tanpa pembayaran tidak kami proses / layani.</li>
          <li>
            Pesanan yang telah di proses tidak dapat di tukar atau dibatalkan
            dengan alasan apapun
          </li>
          <li>
            Pengiriman barang dilakukan dengan menggunakan jasa expedisi dan
            kurir (pihak ketiga) Contoh : Expedisi JNE , Panca Kobra , Baraka ,
            Mex Berlian | Kurir : Gojek , Grab
          </li>
          <li> Harga tidak termasuk ongkos kirim</li>
          <li>
            {' '}
            Jika biaya pengiriman kurang , pembeli wajib membayar dari selisih
            harga tertagih pada resi , setelah biaya pengiriman dibayarkan
            barang kemudian kami kirim. Apabila biaya pengiriman lebih, pembeli
            berhak mengajukan pengembalian dana dari selisi harga yang tertagih
            diresi.
          </li>
          <li>
            {' '}
            Kerusakan barang dalam pengiriman tidak menjadi tanggung jawab kami,
            Maka diwajibkan saat order ditambahkan biaya packing kayu , biaya
            packing double.
          </li>
          <li>Komplain barang kami terima 1x24 jam setelah barang diterima</li>
          <li>Komplain barang wajib menyertakan Video Unboxing Paket</li>
          <li>
            Informasi lainnya silahkan diskusikan dengan Customer Service /
            Admin Kami
          </li>
        </ol>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
