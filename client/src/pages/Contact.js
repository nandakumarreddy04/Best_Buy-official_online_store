import React from "react";
import Layout from "./../components/Layout/Layout";
import { Row, Col, Typography } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Contact = () => {
  return (
    <Layout title={"Contact Us - Best Buy"}>
      <div className="contact-us-page" style={{ paddingTop: '80px', paddingBottom: '50px' }}>
        <Row justify="center">
          <Col xs={24} md={12} lg={10} style={{ textAlign: 'center' }}>
            <Title level={2}>Get in Touch</Title>
            <Text>
              Have a question or a project in mind? Feel free to reach out. For project inquiries, please contact Nanda Reddy directly via the professional links on our About page.
            </Text>
          </Col>
        </Row>
        <Row justify="center" gutter={[32, 32]} style={{ marginTop: '40px' }}>
          <Col xs={24} md={8} style={{ textAlign: 'center' }}>
            <MailOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
            <Title level={4}>Email Support</Title>
            <Text>help@bestbuy.com</Text>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: 'center' }}>
            <PhoneOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
            <Title level={4}>Phone Support</Title>
            <Text>1800-0000-0000 (Toll Free)</Text>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Contact;
