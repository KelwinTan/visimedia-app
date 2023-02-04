import { Card, Spacer, Text } from '@nextui-org/react';
import color from 'constants/color';
import { hover } from 'styles/globals';
import { styAddress } from './style';

export default function AddressChoosen({ address, onChoose }) {
  return (
    <Card
      isHoverable
      key={address.id}
      className={styAddress}
      variant="bordered"
    >
      <Card.Body>
        <Text>Rumah</Text>
        <Text weight="bold">{address.receiver_name}</Text>
        <Text>{address.receiver_phone_number}</Text>
        <Text>
          {address.address_line1}, {address.city} {address.postal_code}{' '}
          {address.country}
        </Text>
        <div onClick={onChoose}>
          <Text color={color.primary} className={hover}>
            Pilih alamat
          </Text>
        </div>
      </Card.Body>
    </Card>
  );
}
