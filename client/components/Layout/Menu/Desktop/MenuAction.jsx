import { Text, User } from "@nextui-org/react";
import UserIcon from "components/Icon/UserIcon";
import Link from "next/link";
import { useAuth } from "providers/auth";
import { actionContainer } from "../../style";

export default function MenuAction() {
  const { isAuth, user } = useAuth();

  return (
    <div className={actionContainer}>
      {isAuth ? (
        <User
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          name={user.name}
        />
      ) : (
        <>
          <UserIcon />
          <div className={userContainer}>
            <Link href={"/login"}>
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
            <Link href={"/register"}>
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
