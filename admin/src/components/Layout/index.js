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
import navItems, { navItemsPath } from "./navItem";
import { cx } from "@emotion/css";
import { useAuth } from "../../context/auth-context";
import { useNavigate, useLocation } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const _Layout = ({ children }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const activeIndex = navItemsPath.findIndex((d) => d === location.pathname);

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
              <Menu
                style={{ padding: "8px 0" }}
                items={[
                  {
                    label: "Logout",
                    onClick: logout,
                    style: { padding: 10 },
                    key: "email",
                  },
                ]}
              />
            }
            placement="bottomRight"
          >
            <a onClick={(e) => e.preventDefault()}>
              <Avatar icon={<UserOutlined />} />
              <span className={styAuthLabel}>{user?.name || "Guest"}</span>
            </a>
          </Dropdown>
        </div>
      </Header>

      <Layout>
        <Sider width={200} className={cx(stySiteLayoutBg, stySider)}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[String(activeIndex)]}
            onClick={({ key }) => navigate(navItemsPath[key])}
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
            padding: 32,
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
