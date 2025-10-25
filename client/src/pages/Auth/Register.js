import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { Form, Input, Button, Row, Col, Typography } from "antd";
const { Title } = Typography;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - Best Buy">
      <div className="register-page">
        <Row justify="center" align="middle" style={{ minHeight: "70vh" }}>
          <Col xs={24} sm={24} md={12} lg={8}>
            <div className="register-form-container">
              <Title level={2} className="text-center">
                Register with Best Buy
              </Title>
              <p className="text-center">
                Sign up for a new account to start shopping!
              </p>
              <Form onFinish={handleSubmit} layout="vertical">
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Please input your name!" }]}
                >
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Your Name"
                  />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "The input is not valid E-mail!" },
                  ]}
                >
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Your Password"
                  />
                </Form.Item>

                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    { required: true, message: "Please input your phone number!" },
                  ]}
                >
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter Your Phone Number"
                  />
                </Form.Item>

                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    { required: true, message: "Please input your address!" },
                  ]}
                >
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Your Address"
                  />
                </Form.Item>

                <Form.Item
                  label="Security Answer"
                  name="answer"
                  rules={[
                    { required: true, message: "Please provide a security answer!" },
                  ]}
                >
                  <Input
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="What is your favorite sport?"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block className="btn-primary">
                    REGISTER
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Register;
