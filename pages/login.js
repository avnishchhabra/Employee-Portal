import { Button, Card, Form, Input, Spin } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import LS from "../utils/Ls";
import UiActions from "../redux/slices/UiSlice";
import AppActions from "../redux/slices/AppSlice";
import { useRouter } from "next/router";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const loading = useSelector((state) => state.ui.loading);
  const login = (data) => {
    dispatch(UiActions.actions.setLoading(true));
    axios.post("login", data).then((res) => {
      dispatch(UiActions.actions.setLoading(false));
      dispatch(AppActions.actions.setToken(res.data.message.jwt));
      LS.set("token", res.data.message.jwt);
      LS.set("user", JSON.stringify(res.data.message));
      router.push('/')
      location.reload();
    });
  };
  return (
    <Card className="loginPageContainer">
      <Form className="loginPage" onFinish={login}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
          name="email"
        >
          <Input type="text" placeholder="Enter email"></Input>
        </Form.Item>
        <Form.Item rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]} name="password">
          <Input type="text" placeholder="Enter password"></Input>
        </Form.Item>
        <Button htmlType="submit">{loading ? <Spin /> : "Login"}</Button>
      </Form>
    </Card>
  );
};

export default Login;
