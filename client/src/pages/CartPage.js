import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
import { Row, Col, Button, Typography, Divider } from "antd";

const { Title, Text } = Typography;

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="cart-page">
        <Row justify="center">
          <Col span={24} style={{ textAlign: "center", marginBottom: "30px" }}>
            <Title level={1}>
              {!auth?.user
                ? "Hello Guest"
                : `Hello, ${auth?.token && auth?.user?.name}`}
            </Title>
            <Title level={4} type="secondary">
              {cart?.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout!"
                  }`
                : "Your Cart is Empty"}
            </Title>
          </Col>
        </Row>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={14}>
            <div className="cart-items-container">
              {cart?.map((p) => (
                <div className="cart-item" key={p._id}>
                  <Row align="middle" gutter={16}>
                    <Col xs={24} sm={6}>
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="cart-item-image"
                        alt={p.name}
                      />
                    </Col>
                    <Col xs={24} sm={12}>
                      <Title level={5}>{p.name}</Title>
                      <Text ellipsis={{ tooltip: p.description }}>
                        {p.description.substring(0, 80)}...
                      </Text>
                      <br />
                      <Text strong>
                        Price:{" "}
                        {p.price.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </Text>
                    </Col>
                    <Col xs={24} sm={6} style={{ textAlign: "right" }}>
                      <Button
                        type="primary"
                        danger
                        onClick={() => removeCartItem(p._id)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          </Col>
          <Col xs={24} md={10}>
            <div className="cart-summary">
              <Title level={3}>Cart Summary</Title>
              <Divider />
              <Title level={4}>Total: {totalPrice()}</Title>
              {auth?.user?.address ? (
                <div className="mb-3">
                  <Text strong>Current Address:</Text>
                  <Text>{auth?.user?.address}</Text>
                  <br />
                  <Button
                    type="default"
                    style={{ marginTop: "10px" }}
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </Button>
                </div>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <Button
                      type="default"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to checkout
                    </Button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <Button
                      type="primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                      block
                      size="large"
                    >
                      {loading ? "Processing..." : "Make Payment"}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default CartPage;
