import React from "react";
import Layout from "./../components/Layout/Layout";
import { Row, Col, Typography } from "antd";

const { Title, Paragraph } = Typography;

const Policy = () => {
  return (
    <Layout title={"Privacy Policy - Best Buy"}>
      <div className="privacy-policy-page" style={{ paddingTop: '80px', paddingBottom: '50px' }}>
        <Row justify="center">
          <Col xs={24} md={20} lg={16}>
            <Typography>
              <Title level={2}>Privacy Policy</Title>
              <Paragraph>
                Best Buy ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Best Buy.
              </Paragraph>
              
              <Title level={4}>1. Information Collection</Title>
              <Paragraph>
                We collect information you provide directly to us. For example, we collect information when you create an account, subscribe, participate in any interactive features of our services, fill out a form, request customer support, or otherwise communicate with us. The types of information we may collect include your name, email address, postal address, credit card information, and other contact or identifying information you choose to provide.
              </Paragraph>

              <Title level={4}>2. Use of Information</Title>
              <Paragraph>
                We may use the information we collect for various purposes, including to: provide, maintain, and improve our services; process transactions and send you related information, including confirmations and invoices; send you technical notices, updates, security alerts, and support and administrative messages.
              </Paragraph>

              <Title level={4}>3. Sharing of Information</Title>
              <Paragraph>
                We do not share your personal information with third parties without your consent, except in the limited circumstances described in this policy, including to comply with laws or to protect our rights.
              </Paragraph>
              
              <Title level={4}>4. Your Consent</Title>
              <Paragraph>
                By using our site, you consent to our privacy policy.
              </Paragraph>

              <Title level={4}>5. Changes to our Privacy Policy</Title>
              <Paragraph>
                If we decide to change our privacy policy, we will post those changes on this page.
              </Paragraph>
            </Typography>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Policy;
