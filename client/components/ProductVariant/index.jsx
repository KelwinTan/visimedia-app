import { Card, Checkbox, Collapse, Text } from '@nextui-org/react';
import _axios from 'shared/axios';
import toIDR from 'shared/currency/toIDR';
import Button from 'components/Button';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from 'react';
import { useRouter } from 'next/router';
import { useUA } from 'providers/user-agent';
import { bool, func, object } from 'prop-types';

const ProductVariant = forwardRef(({ product }, ref) => {
  const [selectedVariant, setSelectedVariant] = useState('');

  useImperativeHandle(
    ref,
    () => {
      return {
        getSelectedVariant() {
          for (const variant of product.productVariantsData) {
            const variantValues = variant.variantValues?.flat();
            if (variantValues.length === 0) {
              return null;
            }
            const productSizeIndex = variantValues.findIndex(
              v => v.variant.variant === 'SIZE (meter)'
            );
            const sizeVariant = variantValues[productSizeIndex].value;

            const variantFind = [
              ...variantValues.slice(0, productSizeIndex),
              ...variantValues.slice(productSizeIndex + 1)
            ].find(detail => {
              const key = `${sizeVariant} - ${detail.variant?.variant} - ${detail.value}`;
              return key === selectedVariant;
            });
            console.log({ sizeVariant, variant, variantFind, selectedVariant });

            if (variantFind)
              return {
                ...variantFind,
                sizeVariant
              };
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
          const sizeVariant = variantValues[productSizeIndex].value;

          return (
            <Collapse
              key={idx}
              title={sizeVariant}
              subtitle={'Rp.' + toIDR(variant.price)}
            >
              {[
                ...variantValues.slice(0, productSizeIndex),
                ...variantValues.slice(productSizeIndex + 1)
              ]?.map((detail, idx) => {
                const key = `${sizeVariant} - ${detail.variant?.variant} - ${detail.value}`;

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
              })}
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
