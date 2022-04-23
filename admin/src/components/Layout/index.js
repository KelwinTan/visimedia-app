import { Layout, Menu, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { node } from "prop-types";
import { VISIMEDIA_LOGO } from "../../assets/image";
import { styLayout, styLogo } from "./style";
import navItems from "./navItem";

const { Header, Content, Sider } = Layout;

const Index = ({ children }) => (
  <Layout className={styLayout}>
    <Header className="header">
      <div className={styLogo}>
        <img className={"image"} src={VISIMEDIA_LOGO} alt="visimedia logo" />
      </div>
      <div className={"menu"}>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="mail" icon={<LogoutOutlined />}>
                Logout
              </Menu.Item>
            </Menu>
          }
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <UserOutlined />
            <span style={{ marginLeft: 8 }}>user_name</span>
          </a>
        </Dropdown>
      </div>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu mode="inline">
          {navItems.map((item, idx) => (
            <Menu.Item key={idx} icon={<item.icon />}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout
        style={{
          padding: 24,
        }}
      >
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
);

Index.defualtProps = {
  children: node,
};

export default Index;
