import { Button, Card, Form, Input } from "antd";
import axios from "axios";
import LS from "../utils/Ls";

const Login = () => {
  const login = (data) => {
    axios.post("login", data).then((res) => {
      LS.set("token", res.data.message.jwt);
      location.reload();
    });
  };
  return (
    <Card className="loginPageContainer">
      <Form className="loginPage" onFinish={login}>
        <Form.Item name="email">
          <Input type="text" placeholder="Enter email"></Input>
        </Form.Item>
        <Form.Item name="password">
          <Input type="text" placeholder="Enter password"></Input>
        </Form.Item>
        <Button htmlType="submit">Login</Button>
      </Form>
    </Card>
  );
};

export default Login;
