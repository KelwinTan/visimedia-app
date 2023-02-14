import { Checkbox, Collapse, Text } from '@nextui-org/react';
import _axios from 'shared/axios';
import toIDR from 'shared/currency/toIDR';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { object } from 'prop-types';

const ProductVariant = forwardRef(({ product }, ref) => {
  const [selectedVariant, setSelectedVariant] = useState('');

  useImperativeHandle(
    ref,
    () => {
      return {
        getSelectedVariant() {
          for (const variant of product.productVariantsData) {
            const [selectedVariantID] = selectedVariant.split('|');
            if (variant.id === +selectedVariantID) {
              return variant;
            }
          }
          return;
        }
      };
    },
    [selectedVariant]
  );

  if (!product.productVariantsData?.length) {
    return null;
  }

  return (
    <>
      <Text b h4>
        Pilih Product
      </Text>
      <Collapse.Group css={{ px: 0 }}>
        {product.productVariantsData?.map((variant, idx) => {
          const variantValues = variant.variantValues?.flat();
          if (variantValues.length === 0) {
            return null;
          }
          const productSizeIndex = variantValues.findIndex(
            v => v.variant.variant === 'SIZE (meter)'
          );

          const titleVariant =
            productSizeIndex > 0
              ? variantValues[productSizeIndex].value
              : variant.product_variant_name;

          return (
            <Collapse
              key={idx}
              title={titleVariant}
              subtitle={'Rp.' + toIDR(variant.price)}
            >
              {
                // [
                //   ...variantValues.slice(0, productSizeIndex),
                //   ...variantValues.slice(productSizeIndex + 1)
                // ]
                variantValues?.map((detail, idx) => {
                  const key = `${variant.id}|${detail.id}`;
                  console.log({ key });

                  return (
                    <Checkbox
                      key={idx}
                      isSelected={selectedVariant === key}
                      onChange={checked => {
                        if (checked) {
                          setSelectedVariant(key);
                        } else {
                          setSelectedVariant('');
                        }
                      }}
                      size="md"
                    >
                      {detail.variant?.variant} - {detail.value}
                    </Checkbox>
                  );
                })
              }
            </Collapse>
          );
        })}
      </Collapse.Group>
    </>
  );
});

export default ProductVariant;

ProductVariant.propTypes = {
  product: object.isRequired
};
