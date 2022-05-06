import GojekIcon from "components/Icon/GojekIcon";
import GrabIcon from "components/Icon/GrabIcon";
import JneIcon from "components/Icon/JneIcon";
import MexIcon from "components/Icon/MexIcon";
import { Text } from "@nextui-org/react";
import Layout from "./layout";
import { dFlex, mTop } from "styles/globals";
import { css, cx } from "@emotion/css";

const style = {
  deliveryList: css`
    margin-right: 8px;
  `,
};
export default function () {
  return (
    <Layout>
      <div>
        <Text h4>
          Pengiriman barang dilakukan dengan menggunakan jasa expedisi , kurir
          (pihak ketiga) Seperti:
        </Text>
      </div>

      <div className={cx(dFlex, mTop("10px"))}>
        <div className={style.deliveryList}>
          <JneIcon />
        </div>
        <div className={style.deliveryList}>
          <MexIcon />
        </div>
        <div className={style.deliveryList}>
          <GrabIcon />
        </div>
        <div className={style.deliveryList}>
          <GojekIcon />
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <Text weight={"bold"}>Ketentuan Pengiriman melalui expedisi :</Text>
        <ol>
          <li>Pengiriman dilakukan setelah pembayaran Lunas</li>
          <li>Pengiriman barang ke Expedisi 1 hari kerja setelah pembayaran</li>
          <li>Resi Pengiriman kami input pada hari kerja berikutnya</li>
          <li>
            Biaya pengiriman sebenarnya merujuk pada resi setelah dilakukan
            pengiriman
          </li>
          <li>
            Apabila terjadi kekurangan biaya kirim , barang akan kami tahan
            (tidak dikirim) dan admin kami akan menghubungi pembeli untuk
            konfrimasi sisa biaya kirim sesuai yang tertagih di resi
          </li>
          <li>
            Jika ada lebih bayar maka pembeli berhak mengajukan Pengembalian
            Dana
          </li>
          <li>
            Proses Pengembalian dana hingga dana ditransfer kembali ke rekening
            pembeli
          </li>
          membutuhkan waktu 7 x 24 jam atau lebih lama.
          <li>
            Keterlambatan dan masalah dalam pengiriman tidak menjadi tanggung
            jawab kami
          </li>
          <li>
            Gratis pengiriman untuk wilaya Jabodetabek dengan syarat dan
            ketentuan.
          </li>
          <li>
            Informasi lainnya silahkan diskusikan dengan Customer Service /
            Admin Kami
          </li>
        </ol>
      </div>

      <div style={{ marginTop: 16 }}>
        <Text weight={"bold"}>
          Ketentuan Pengiriman Kurir (Gojek , Grab , dll )
        </Text>

        <ol>
          <li> Pemesanan kurir dilakukan sendiri oleh pembeli</li>
          <li>
            {" "}
            Proses penyiaapan barang membutuhkan waktu 3-4 jam atau lebih
            tergantung barang yang dipesan
          </li>
          <li>
            {" "}
            Selama proses penyiapan barang , pembeli tidak diperkenankan
            melakukan pemesanan kurir
          </li>
          <li>
            {" "}
            Setelah barang siap , pembeli akan mendapat pemberitahuan dari Admin
            kami melalui Whatssapp / Telp
          </li>
          <li>
            {" "}
            Setelah mendapat pemberitahuan , pembeli bisa melakukan pemesanan
            kurir
          </li>
          <li> Biaya kirim dibayarkan pembeli</li>
          <li>
            {" "}
            Resiko kerusakan dan kehilangan saat pengiriman oleh kurir bukan
            menjadi tanggung jawab kami
          </li>
        </ol>
      </div>
    </Layout>
  );
}
