import { Button, Checkbox, Col, Form, Input, Row, message } from "antd";
import { Layout } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const { Header, Content } = Layout;

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    await axios
      .post("http://localhost:3000/api/v1/login", values)
      .then((res) => {
        messageApi.open({
          type: "success",
          content: res?.data?.message,
        });
        const loggedInUser = res?.data?.data?.user;
        localStorage.setItem("user", loggedInUser);
        localStorage.setItem("token", res?.data?.data?.token);
        if (loggedInUser?.role === "creator") navigate("/create-post");
        else navigate("/");
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: err?.response?.data?.error,
        });
      });
  };
  const onFinishFailed = (errorInfo) => {
    messageApi.open({
      type: "error",
      content: "Please fill required fields!",
    });
  };
  return (
    <>
      {contextHolder}
      <Layout>
        <Header className="mb-10">
          <Row>
            <Col span={24} className="text-center">
              <strong className="text-white uppercase">Login</strong>
            </Col>
          </Row>
        </Header>
        <Content className="container">
          <Row>
            <Col span={12} offset={6}>
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button htmlType="submit">Log in</Button>
                  &nbsp; OR &nbsp;
                  <Link to={"/sign-up"}>
                    <span className="font-glory_regular font-size-16px text-royalBlue space-x-2">
                      register now!
                    </span>
                  </Link>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};
export default Login;
