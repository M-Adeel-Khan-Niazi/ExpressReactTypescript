import { Button, Col, Form, Input, Row, Select, message } from "antd";
import { Layout } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const { Header, Content } = Layout;
const { Option } = Select;

const SignUp = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    await axios
      .post("http://localhost:3000/api/v1/register", values)
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
              <strong className="text-white uppercase">SignUp</strong>
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
                  label="Full Name"
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Full Name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="role"
                  label="Role"
                  rules={[{ required: true, message: "Please select role!" }]}
                >
                  <Select placeholder="select your role">
                    <Option value="creator">Creator</Option>
                    <Option value="viewer">Viewer</Option>
                  </Select>
                </Form.Item>

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
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button htmlType="submit">Register</Button>
                  &nbsp; OR have an account? &nbsp;
                  <Link to={"/log-in"}>
                    <span className="font-glory_regular font-size-16px text-royalBlue space-x-2">
                      logIn now!
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
export default SignUp;
