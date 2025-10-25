import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import { Form, Input, Button, Row, Col, Typography } from "antd";
const { Title } = Typography;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login - Best Buy">
      <div className="login-page">
        <Row justify="center" align="middle" style={{ minHeight: "70vh" }}>
          <Col xs={24} sm={24} md={12} lg={8}>
            <div className="login-form-container">
              <Title level={2} className="text-center">
                Login to Best Buy
              </Title>
              <p className="text-center">
                Get access to your Orders, Wishlist and Recommendations
              </p>
              <Form onFinish={handleSubmit} layout="vertical">
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
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      navigate("/forgot-password");
                    }}
                  >
                    Forgot Password
                  </button>
                </div>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block className="btn-primary">
                    LOGIN
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

export default Login;
