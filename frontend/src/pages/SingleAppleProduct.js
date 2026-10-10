// pages/SingleAppleProduct.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import Four04 from "./Four04";
import "./SingleAppleProduct.css";

function SingleAppleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setNotFound(false);

        const response = await api.get(`/products/${id}`);
        const productData = response.data?.product || response.data?.data || response.data;

        if (productData && productData.product_name) {
          setProduct(productData);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Error fetching single product:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5" style={{ minHeight: "60vh", marginTop: "100px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading product details...</span>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return <Four04 />;
  }

  return (
    <div className="single-product-page my-5 pt-5">
      <div className="container">
        {/* Title and Brief */}
        <div className="mb-3 text-start">
          <Link to="/iphone" className="text-decoration-none fw-semibold" style={{ color: "#0071e3" }}>
            &larr; All iPhone models
          </Link>
        </div>
        <div className="row justify-content-center text-center mb-4">
          <div className="col-12">
            <h1 className="font-weight-bold" style={{ fontSize: "48px", fontWeight: "700", color: "#1d1d1f" }}>
              {product.product_name}
            </h1>
            <div className="brief-description mt-2" style={{ fontSize: "21px", color: "#6e6e73" }}>
              {product.product_brief_description}
            </div>
          </div>
        </div>

        {/* Product Details & Image */}
        <div className="row justify-content-center align-items-center my-4">
          {/* Left Column: Price & Description */}
          <div className="col-sm-12 col-md-6 text-center text-md-start mb-4 mb-md-0 px-lg-5">
            <div className="starting-price mb-1" style={{ fontSize: "17px", fontWeight: "600", color: "#1d1d1f" }}>
              Starting at {product.starting_price}
            </div>
            <div className="monthly-price mb-3" style={{ fontSize: "14px", color: "#86868b" }}>
              {product.price_range}
            </div>
            <div
              className="product-description mb-4"
              style={{ fontSize: "15px", lineHeight: "1.6", color: "#333336" }}
            >
              {product.product_description}
            </div>

            {product.product_link && (
              <a
                href={product.product_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary px-4 py-2"
                style={{ borderRadius: "20px", background: "#0071e3", borderColor: "#0071e3" }}
              >
                Learn More on Apple.com &gt;
              </a>
            )}
          </div>

          {/* Right Column: Image */}
          <div className="col-sm-12 col-md-6 text-center">
            <div className="product-image-container">
              <img
                src={product.product_img}
                alt={product.product_name}
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "480px", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleAppleProduct;
