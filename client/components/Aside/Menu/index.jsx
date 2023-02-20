import { Container, Text } from '@nextui-org/react';
import CloseIcon from 'components/Icon/CloseIcon';
import Portal from 'components/Portal';
import color from 'constants/color';
import Link from 'next/link';
import { useAside } from 'providers/aside';
import { styAside, styHeader } from '../style';

export default function AsideMenu() {
  const { toggleVisible, visible } = useAside();

  return (
    <Portal>
      <aside className={styAside({ visible: visible.user_menu })}>
        <div className={styHeader}>
          <Container
            fluid
            display="flex"
            justify={'space-between'}
            css={{ margin: 'unset' }}
          >
            <Text weight="bold" h5 color={color.white}>
              MENU
            </Text>
            <div onClick={() => toggleVisible('user_menu')}>
              <CloseIcon color={color.white} />
            </div>
          </Container>
        </div>

        <Container fluid>
          <Link href={{ pathname: '/cart' }} onClick={() => toggleVisible('user_menu')}>

            <Text weight={'semibold'}>Keranjang</Text>

          </Link>
          <Link href={{ pathname: '/order' }} onClick={() => toggleVisible('user_menu')}>

            <Text weight={'semibold'}>Order</Text>

          </Link>
        </Container>
      </aside>
    </Portal>
  );
}
