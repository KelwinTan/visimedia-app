import { Layout, Menu, Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { node } from "prop-types";
import { VISIMEDIA_LOGO } from "../../assets/image";
import {
  styAuthLabel,
  styContent,
  styHeader,
  styLayout,
  styLogo,
  styLogoImage,
  styMenu,
  styNavItem,
  stySider,
  stySiteLayoutBg,
} from "./style";
import navItems from "./navItem";
import { cx } from "@emotion/css";
import { useAuth } from "../../context/auth-context";

const { Header, Content, Sider } = Layout;

const _Layout = ({ children }) => {
  const { logout } = useAuth();

  return (
    <Layout className={styLayout}>
      <Header className={styHeader}>
        <div className={styLogo}>
          <img
            className={styLogoImage}
            src={VISIMEDIA_LOGO}
            alt="visimedia logo"
          />
        </div>
        <div className={styMenu}>
          <Dropdown
            arrow
            overlay={
              <Menu style={{ padding: "8px 0" }}>
                <Menu.Item key="mail" style={{ padding: 10 }} onClick={logout}>
                  Logout
                </Menu.Item>
              </Menu>
            }
            placement="bottomRight"
          >
            <a onClick={(e) => e.preventDefault()}>
              <Avatar icon={<UserOutlined />} />
              <span className={styAuthLabel}>Guest</span>
            </a>
          </Dropdown>
        </div>
      </Header>

      <Layout>
        <Sider width={200} className={cx(stySiteLayoutBg, stySider)}>
          <Menu
            mode="inline"
            items={navItems.map((item, idx) => {
              const Icon = item.icon;
              return {
                key: idx,
                icon: <Icon />,
                label: item.label,
                className: styNavItem,
              };
            })}
          />
        </Sider>
        <Layout
          style={{
            padding: "32px 56px 56px",
          }}
        >
          <Content className={cx(stySiteLayoutBg, styContent)}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

_Layout.defualtProps = {
  children: node,
};

export default _Layout;
