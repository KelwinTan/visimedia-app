import { Button, Result } from "antd";
import { useHistory } from "react-router";

export default function NotFound() {
  const navigate = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate.push("/")}>
          Back Home
        </Button>
      }
    />
  );
}
