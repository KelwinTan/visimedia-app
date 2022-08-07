/**
 * layout for content, ex :
 * - page title ------------- button add
 *  - table
 */

import { Button, Space } from "antd";
import { styAction, styHeader, styMain, styTitle } from "./styles";

export default function LayoutContent({ children, title, actions = [] }) {
  return (
    <>
      <div className={styHeader}>
        <h2 className={styTitle}>{title}</h2>
        <Space direction="horizontal" size={"middle"} className={styAction}>
          {actions.map((action, idx) => (
            <Button key={idx} {...action}>
              {action.text}
            </Button>
          ))}
        </Space>
      </div>

      <main className={styMain}>{children}</main>
    </>
  );
}
