import { css } from '@emotion/css';
import { Container, Input, Text } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TrashIcon from 'components/Icon/TrashIcon';
import auth from 'constants/auth';
import { getCookie } from 'cookies-next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import _axios from 'shared/axios';
import toIDR from 'shared/currency/toIDR';
import { styCart, styCartDescription, styCartIncreDecre } from './style';
import debounce from 'lodash/debounce';
import { useDebounceValue } from 'hooks/useDebouceValue';

export default function CartItem({ cart }) {
  const { cart_item, product_detail, product_variant = {} } = cart;
  const client = useQueryClient();
  const [qty, setQty] = useState(cart_item.quantity);

  const { mutateAsync: removeCart } = useMutation(
    vars =>
      _axios.delete(`cart-items/${vars.cartId}`, {
        headers: {
          Authorization: `Bearer ${getCookie(auth.TOKEN)}`
        }
      }),
    {
      onSuccess() {
        client.refetchQueries(['carts']);
      }
    }
  );

  const { mutateAsync: changeQty } = useMutation(
    vars =>
      _axios.post('cart-items', vars, {
        headers: {
          Authorization: `Bearer ${getCookie(auth.TOKEN)}`
        }
      }),
    {
      onSuccess() {
        client.refetchQueries(['carts']);
      }
    }
  );

  const onIncreDecre = useCallback(
    type => {
      changeQty({
        product_id: 5,
        quantity: type === 'decre' ? -1 : 1,
        product_variant_id: product_variant?.id
      }).then(() => {
        setQty(prev => prev + (type === 'decre' ? -1 : 1));
      });
    },
    [changeQty]
  );

  const onRemoveCart = () => {
    removeCart({ cartId: cart_item.id });
  };

  const debouncedResults = useMemo(() => {
    return debounce(function (e) {
      const diff = Number(e.target.value) - cart_item.quantity;
      changeQty({
        product_id: 5,
        quantity: diff,
        product_variant_id: product_variant?.id
      });
    }, 1000);
  }, [cart_item, product_variant]);

  return (
    <Container lg fluid className={styCart}>
      <img
        width={64}
        height={64}
        style={{ margin: '0 !important' }}
        src={process.env.IMAGE_URL + product_detail.public_image_url}
      />
      <div className={styCartDescription}>
        <Text weight={'bold'} h5>
          {product_detail.name}
        </Text>
        <Text>{product_variant?.product_variant_name}</Text>
        <Text>Rp.{toIDR(product_variant?.price)}</Text>
      </div>

      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          marginLeft: 'auto'
        })}
      >
        <div onClick={onRemoveCart}>
          <TrashIcon />
        </div>

        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            marginLeft: '1rem'
          })}
        >
          <div
            onClick={() => onIncreDecre('decre')}
            className={styCartIncreDecre}
          >
            -
          </div>
          <div>
            <Input initialValue={qty} value={qty} onChange={debouncedResults} />
          </div>
          <div onClick={onIncreDecre} className={styCartIncreDecre}>
            +
          </div>
        </div>
      </div>
    </Container>
  );
}
