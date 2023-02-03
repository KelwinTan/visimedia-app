import { Dropdown, Text, User } from '@nextui-org/react';
import UserIcon from 'components/Icon/UserIcon';
import WhatsappGIF from 'components/Icon/WhatsappGIF';
import color from 'constants/color';
import Link from 'next/link';
import { useAuth } from 'providers/auth';
import { hover, styMargin } from 'styles/globals';
import { actionContainer, userContainer } from '../../style';

export default function MenuAction() {
  const { isAuth, user } = useAuth();

  return (
    <div className={actionContainer}>
      <div className={styMargin(0, 8, 0, 0)}>
        <a
          href="https://api.whatsapp.com/send/?phone=6282110200808&text=Hallo+Visimedia...&type=phone_number&app_absent=0"
          target={'_blank'}
          rel="noreferrer"
        >
          <WhatsappGIF width={48} height={48} classnames={hover} />
        </a>
      </div>
      {isAuth ? (
        <Dropdown placement="bottom-right">
          <Dropdown.Trigger>
            <User
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              name={user.name}
              pointer
            />
          </Dropdown.Trigger>
          <Dropdown.Menu color="primary" aria-label="User Actions">
            <Dropdown.Item key="profile">
              <Link href={'/settings'}>
                <a>
                  <Text
                    weight="bold"
                    css={{ marginLeft: 8, color: color.gray }}
                    className={hover}
                  >
                    Pengaturan
                  </Text>
                </a>
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <>
          <UserIcon />
          <div className={userContainer}>
            <Link href={'/login'}>
              <a>
                <Text
                  weight="bold"
                  css={{ marginLeft: 8, color: color.gray }}
                  size={14}
                  className={hover}
                >
                  Masuk
                </Text>
              </a>
            </Link>
            <Link href={'/register'}>
              <a>
                <Text
                  weight="bold"
                  css={{ marginLeft: 8, color: color.gray }}
                  size={14}
                  className={hover}
                >
                  Daftar
                </Text>
              </a>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
