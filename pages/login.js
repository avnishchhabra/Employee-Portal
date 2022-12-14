import { Button, Card, Form, Input, notification, Spin } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import headers from '../utils/header';
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
      if(res.data.status === 200) {
      dispatch(UiActions.actions.setLoading(false));
      dispatch(AppActions.actions.setToken(res.data.message.jwt));
      LS.set("token", res.data.message.jwt);
      LS.set("user", JSON.stringify(res.data.message));
      location.reload();
      router.push('/')
      } else {
        dispatch(UiActions.actions.setLoading(false));
        notification.error({
          message: "Invalid Crediantials",
          description: "Please enter correct details!"
        })
      }
    });
  };
  return (
    <div className="loginPageContainer">
      <div className="formContainer">
      <Card>
      <Form layout="vertical" className="loginPage" onFinish={login}>
        <h1 className="center">NENPL KIOSK</h1>
        <Form.Item
         label='Email'
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
        <Form.Item label='Password' rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]} name="password">
          <Input type="password" placeholder="Enter password"></Input>
        </Form.Item>
        <Button className="mt-md" type="primary" htmlType="submit">{loading ? <Spin /> : "Login"}</Button>
      </Form>
    </Card>
      </div>
    </div>
  );
};

export default Login;
