import { Card, Collapse, Text } from "@nextui-org/react";
import _axios from "shared/axios";
import toIDR from "shared/currency/toIDR";
import Button from "components/Button";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { useUA } from "providers/user-agent";
import { bool, object } from "prop-types";

export default function ProductVariant({ product, showSellNow }) {
  const { isMobile } = useUA();

  if (!product.productVariantsData?.length) {
    return null;
  }

  return (
    <>
      <Text b h4>
        Pilih Varian
      </Text>
      <Collapse.Group css={{ px: 0 }}>
        {product.productVariantsData?.map((variant, idx) => {
          return (
            <Collapse
              key={idx}
              title={variant.product_variant_name}
              subtitle={"Rp." + toIDR(variant.price)}
            >
              {variant.variantValues?.flat()?.map((detail, idx) => (
                <Text key={idx}>
                  {detail.variant?.variant} - {detail.value}
                </Text>
              ))}
            </Collapse>
          );
        })}
      </Collapse.Group>
    </>
  );
  return (
    <Card
      variant="bordered"
      css={{ borderRadius: 8, maxWidth: isMobile ? "100%" : 300 }}
    >
      <Card.Body>
        <Text b h4>
          Pilih Varian
        </Text>
        <Collapse.Group css={{ px: 0 }}>
          {product.productVariantsData?.map((variant, idx) => {
            return (
              <Collapse
                key={idx}
                title={variant.product_variant_name}
                subtitle={"Rp." + toIDR(variant.price)}
              >
                {variant.variantValues?.flat()?.map((detail, idx) => (
                  <Text key={idx}>
                    {detail.variant?.variant} - {detail.value}
                  </Text>
                ))}
              </Collapse>
            );
          })}
        </Collapse.Group>
      </Card.Body>
    </Card>
  );
}

ProductVariant.propTypes = {
  product: object.isRequired,
  showSellNow: bool,
};
ProductVariant.defaultProps = {
  showSellNow: true,
};
