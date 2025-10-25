import React from "react";
import Layout from "./../components/Layout/Layout";
import { Row, Col, Typography } from "antd";
import { GithubOutlined, LinkedinOutlined, InstagramOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <Layout title={"About Us - Best Buy"}>
      <div className="about-us-page" style={{ paddingTop: '80px', paddingBottom: '50px' }}>
        <Row justify="center" align="middle" gutter={[32, 32]}>
          <Col xs={24} md={12} lg={10}>
            <img
              src="/images/about.jpeg"
              alt="About Best Buy"
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Col>
          <Col xs={24} md={12} lg={10}>
            <Typography>
              <Title level={2}>Welcome to Best Buy</Title>
              <Paragraph>
                This application is a comprehensive MERN stack project designed to showcase a modern, scalable, and feature-rich e-commerce platform. From user authentication to payment gateway integration, it demonstrates a full-fledged online shopping experience.
              </Paragraph>
              <Title level={4}>Developed by Nanda Reddy</Title>
              <Paragraph>
                A passionate Full Stack Developer with a keen eye for detail and a drive for creating seamless user experiences. This project is a testament to my skills in MongoDB, Express, React, and Node.js.
              </Paragraph>
              <div style={{ marginTop: '20px' }}>
                <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer" style={{ marginRight: '20px', fontSize: '24px' }}>
                  <GithubOutlined />
                </a>
                <a href="https://linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer" style={{ marginRight: '20px', fontSize: '24px' }}>
                  <LinkedinOutlined />
                </a>
                <a href="https://instagram.com/your-instagram-handle" target="_blank" rel="noopener noreferrer" style={{ fontSize: '24px' }}>
                  <InstagramOutlined />
                </a>
              </div>
            </Typography>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default About;
