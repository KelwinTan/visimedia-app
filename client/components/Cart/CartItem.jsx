import { css } from '@emotion/css';
import { Card, Image, Input, Text } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TrashIcon from 'components/Icon/TrashIcon';
import auth from 'constants/auth';
import { getCookie } from 'cookies-next';
import { useCallback, useState } from 'react';
import _axios from 'shared/axios';
import toIDR from 'shared/currency/toIDR';
import { styCart, styCartDescription, styCartIncreDecre } from './style';
import debounce from 'lodash/debounce';

export default function CartItem({ cart }) {
  const { cart_item, product_detail } = cart;
  const client = useQueryClient();

  const { mutate } = useMutation(
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
      mutate({
        product_id: 5,
        quantity: type === 'decre' ? -1 : 1
      });
    },
    [mutate]
  );

  return (
    <div className={styCart}>
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
        <Text>Rp.{toIDR(product_detail.price)}</Text>
      </div>

      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          marginLeft: 'auto'
        })}
      >
        <TrashIcon />

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
            <Input
              initialValue={cart_item.quantity}
              onChange={debounce(e => {
                const diff = Number(e.target.value) - cart_item.quantity;
                mutate({
                  product_id: 5,
                  quantity: diff
                });
              }, 1000)}
            />
          </div>
          <div onClick={onIncreDecre} className={styCartIncreDecre}>
            +
          </div>
        </div>
      </div>
    </div>
  );
}
