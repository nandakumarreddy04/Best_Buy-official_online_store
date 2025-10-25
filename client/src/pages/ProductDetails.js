import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart";
import { ShoppingCartOutlined } from "@ant-design/icons"; // Import the shopping cart icon
import { Row, Col, Button, Typography, Divider } from "antd";
import toast from "react-hot-toast";

const { Title, Text, Paragraph } = Typography;

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="product-details-page">
        <div className="product-details-container">
          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
              {product._id && (
                <img
                  src={`/api/v1/product/product-photo/${product._id}`}
                  className="product-details-image"
                  alt={product.name}
                />
              )}
            </Col>
            <Col xs={24} md={12}>
              <Title level={2}>{product.name}</Title>
              <Text type="secondary">{product?.category?.name}</Text>
              <Divider />
              <Paragraph>{product.description}</Paragraph>
              <Title level={3}>
                Price:{" "}
                {product?.price?.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </Title>
              <Button
                type="primary"
                size="large"
                className="btn-primary"
                onClick={() => {
                  setCart([...cart, product]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, product])
                  );
                  toast.success("Item Added to cart");
                }}
              >
                <ShoppingCartOutlined style={{ marginRight: '6px' }} /> Add to cart
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      <Divider />
      <div className="related-products-container">
        <Title level={3}>Similar Products</Title>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <Row gutter={[16, 16]}>
          {relatedProducts?.map((p) => (
            <Col xs={24} sm={12} md={8} lg={6} key={p._id}>
              <div className="card">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  onClick={() => navigate(`/product/${p.slug}`)}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 60)}...
                  </p>
                  <Button
                    type="primary"
                    block
                    className="btn-primary"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem("cart", JSON.stringify([...cart, p]));
                      toast.success("Item Added to cart");
                    }}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default ProductDetails;
