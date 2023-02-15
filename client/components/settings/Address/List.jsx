import { Card, Spacer, Text } from '@nextui-org/react';
import { styAddress } from './style';
import { AddressProps } from './type';

/**
 * @param {{address: AddressProps}} props
 */
export default function AddressList(props) {
  const { address } = props;

  return (
    <>
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
        </Card.Body>
      </Card>
    </>
  );
}
