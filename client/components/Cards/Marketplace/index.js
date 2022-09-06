import { cx } from "@emotion/css";
import { Card, Text } from "@nextui-org/react";
import { node, string } from "prop-types";
import { styCard, styCardMain, styCardTitle } from "./styles";

export default function Marketplace({ title, classnames, children }) {
  return (
    <Card className={cx(styCard, classnames)}>
      <div className={styCardTitle}>
        <Text b color="white">
          {title}
        </Text>
      </div>
      <section className={styCardMain}>{children}</section>
    </Card>
  );
}
Marketplace.propTypes = {
  title: string.isRequired,
  children: node.isRequired,
  classnames: string,
};
Marketplace.defaultProps = {
  classnames: "",
};
