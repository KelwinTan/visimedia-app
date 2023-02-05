import { Row, Text } from "@nextui-org/react";
import CalenderIcon from "components/Icon/CalenderIcon";
import EmailIcon from "components/Icon/EmailIcon";
import PhoneIcon from "components/Icon/PhoneIcon";
import color from "constants/color";
import Layout from "components/Layout/FAQ/layout";

export default function CallUs() {
  return (
    <Layout>
      <Text css={{ marginBlock: 8 }} weight={"bold"}>
        Hubungi Kami
      </Text>

      <Row align="center">
        <CalenderIcon width={16} height={16} color={color.black} />
        <Text className={"link"} size={14} style={{ marginLeft: 8 }}>
          Buka Senin-Jumat (08.00 - 17.00), Sabtu (08.00 - 14.00)
        </Text>
      </Row>

      <Row align="center">
        <EmailIcon width={16} height={16} color={color.black} />
        <Text className={"link"} size={14} style={{ marginLeft: 8 }}>
          visimediasupplier@gmail.com
        </Text>
      </Row>

      <Row align="center">
        <PhoneIcon width={16} height={16} color={color.black} />
        <Text className={"link"} size={14} style={{ marginLeft: 8 }}>
          021 2967 6248/49
        </Text>
      </Row>

      <Row align="center">
        <PhoneIcon width={16} height={16} color={color.black} />
        <Text className={"link"} size={14} style={{ marginLeft: 8 }}>
          0821 1020 0808
        </Text>
      </Row>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
