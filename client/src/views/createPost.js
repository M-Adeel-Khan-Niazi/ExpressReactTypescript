import { Button, Col, Form, Input, Row, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import axios from "axios";
const { Header, Content } = Layout;

const CreatePost = () => {
  const [fileList, setFileList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("image", fileList[0]);
    const token = localStorage.getItem("token");
    await axios
      .post("http://localhost:3000/api/v1/post", formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        messageApi.open({
          type: "success",
          content: res?.data?.message,
        });
        form.resetFields();
        setFileList([]);
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: err?.response?.data?.error,
        });
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  return (
    <>
      {contextHolder}
      <Layout>
        <Header className="mb-10">
          <Row>
            <Col span={24} className="text-center">
              <strong className="text-white uppercase">Create Post</strong>
            </Col>
          </Row>
        </Header>
        <Content className="container">
          <Row>
            <Col span={12} offset={6}>
              <Form
                form={form}
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
                  label="Title"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Title!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item label="Upload" valuePropName="fileList">
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                  </Upload>
                </Form.Item>

                <Form.Item label="Description" name="description">
                  <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button htmlType="submit">Submit</Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};
export default CreatePost;
