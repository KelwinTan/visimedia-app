/**
 * layout for content, ex :
 * - page title ------------- button add
 *  - table
 */

import { Button, PageHeader, Row } from "antd";

export default function LayoutContent({ children, title, actions = [] }) {
  return (
    <PageHeader
      title={title}
      extra={actions.map((action, idx) => (
        <Button key={idx} {...action}>
          {action.text}
        </Button>
      ))}
    >
      <Row>
        <div style={{ flex: 1 }}>{children}</div>
      </Row>
    </PageHeader>
  );
}
